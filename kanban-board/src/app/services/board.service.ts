import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Auth } from '@angular/fire/auth';
import { Board } from '../models/board.model';
@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private apiUrl = 'http://localhost:8888/board-service/api/boards';

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

  getAllBoards(): Observable<Board[]> {
    return this.getHeaders().pipe(
      switchMap((headers) => this.http.get<Board[]>(this.apiUrl, { headers }))
    );
  }

  createBoard(board: Board): Observable<Board> {
    return this.getHeaders().pipe(
      switchMap((headers) =>
        this.http.post<Board>(this.apiUrl, board, { headers })
      )
    );
  }

  deleteBoard(boardId: number): Observable<any> {
    return this.getHeaders().pipe(
      switchMap((headers) =>
        this.http.delete(`${this.apiUrl}/${boardId}`, { headers })
      )
    );
  }
}
