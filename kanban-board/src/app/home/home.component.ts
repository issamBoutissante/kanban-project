import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BoardService } from '../services/board.service';
import { Board } from '../models/board.model'; // Make sure you have a Board model

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  boards: Board[] = [];
  newBoardName: string = '';

  constructor(
    private auth: Auth,
    private router: Router,
    private boardService: BoardService
  ) {}

  ngOnInit(): void {
    this.loadBoards();
  }

  loadBoards(): void {
    this.boardService.getAllBoards().subscribe(
      (boards: Board[]) => {
        this.boards = boards;
      },
      (error) => {
        console.error('Error loading boards:', error);
        // Handle errors here, e.g., showing a notification to the user
      }
    );
  }

  addNewBoard(): void {
    if (this.newBoardName.trim()) {
      const newBoard = { name: this.newBoardName };
      this.boardService.createBoard(newBoard as Board).subscribe((board) => {
        this.boards.push(board); // Assuming the response is the new board with an id
        this.newBoardName = ''; // Reset the input field
      });
    }
  }

  openBoard(boardId: number): void {
    this.router.navigate(['/board', boardId]);
  }

  deleteBoard(boardId: number): void {
    this.boardService.deleteBoard(boardId).subscribe(() => {
      this.boards = this.boards.filter((board) => board.id !== boardId); // Remove the board from the list
    });
  }

  logout(): void {
    this.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
