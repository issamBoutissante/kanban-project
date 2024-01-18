import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Auth } from '@angular/fire/auth';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:8888/task-service/api/tasks';

  constructor(private http: HttpClient, private auth: Auth) {}

  private getHeaders(): Observable<HttpHeaders> {
    return this.auth.currentUser
      ? from(this.auth.currentUser.getIdToken()).pipe(
          map((token) =>
            new HttpHeaders().set('Authorization', `Bearer ${token}`)
          )
        )
      : throwError(() => new Error('User is not logged in'));
  }

  addTask(task: Task): Observable<Task> {
    return this.getHeaders().pipe(
      switchMap((headers) =>
        this.http.post<Task>(this.apiUrl, task, { headers })
      )
    );
  }

  getTasksByBoardId(boardId: number): Observable<Task[]> {
    return this.getHeaders().pipe(
      switchMap((headers) =>
        this.http.get<Task[]>(`${this.apiUrl}/board/${boardId}`, { headers })
      )
    );
  }

  updateTask(task: Task): Observable<Task> {
    return this.getHeaders().pipe(
      switchMap((headers) =>
        this.http.put<Task>(`${this.apiUrl}/${task.id}`, task, { headers })
      )
    );
  }

  deleteTask(taskId: number): Observable<any> {
    return this.getHeaders().pipe(
      switchMap((headers) =>
        this.http.delete(`${this.apiUrl}/${taskId}`, { headers })
      )
    );
  }
}
