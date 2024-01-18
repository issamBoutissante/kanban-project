import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  KanbanComponent,
  CardSettingsModel,
  ActionEventArgs,
} from '@syncfusion/ej2-angular-kanban';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  @ViewChild('kanbanObj') kanbanObj!: KanbanComponent;
  public kanbanData!: Task[];
  public cardSettings: CardSettingsModel = {
    contentField: 'summary',
    headerField: 'title',
  };
  public statusData: string[] = ['Open', 'InProgress', 'Testing', 'Close'];
  public boardId!: number; // Make sure this is defined

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.boardId = +params['id'];
      this.loadTasks();
    });
  }

  loadTasks(): void {
    this.taskService.getTasksByBoardId(this.boardId).subscribe((tasks) => {
      this.kanbanData = tasks;
    });
  }

  onActionComplete(event: ActionEventArgs): void {
    console.log(event);
    if (event.requestType === 'cardCreated' && event.addedRecords) {
      const newTaskData = event.addedRecords[0];
      if (newTaskData) {
        const newTask: Task = {
          ...(newTaskData as Task),
          boardId: this.boardId, // Ensure this is the correct property name expected by your backend
        };
        this.taskService.addTask(newTask).subscribe((task: Task) => {
          console.log('Task created:', task);
          this.loadTasks();
        });
      }
    } else if (event.requestType === 'cardRemoved' && event.deletedRecords) {
      const deletedTaskId = (event.deletedRecords[0] as Task).id;
      if (deletedTaskId) {
        this.taskService.deleteTask(deletedTaskId).subscribe(() => {
          console.log('Task removed');
          this.loadTasks();
        });
      }
    } else if (event.requestType === 'cardChanged' && event.changedRecords) {
      const updatedTaskData = event.changedRecords[0];
      if (updatedTaskData) {
        const updatedTask: Task = {
          ...(updatedTaskData as Task),
          boardId: this.boardId, // Ensure this is the correct property name expected by your backend
        };
        this.taskService.updateTask(updatedTask).subscribe((task: Task) => {
          console.log('Task updated:', task);
          this.loadTasks();
        });
      }
    }
  }
  addClick(): void {
    const cardDetails: Task = {
      title: '',
      status: 'Open',
      summary: '',
    };
    this.kanbanObj.openDialog('Add', cardDetails);
  }
}
