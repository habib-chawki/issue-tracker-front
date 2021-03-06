import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Board from 'src/app/models/board/board';

@Injectable({
  providedIn: 'root',
})
export class BoardIntercomService {
  boardFormSaved$ = new Subject<Board>();

  constructor() {}

  announceBoardFormSaved(board: Board) {
    this.boardFormSaved$.next(board);
  }
}
