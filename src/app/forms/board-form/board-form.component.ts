import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BoardSharedService } from 'src/app/services/shared/board/board-shared.service';

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html',
  styleUrls: ['./board-form.component.scss'],
})
export class BoardFormComponent implements OnInit {
  boardForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(private boardSharedService: BoardSharedService) {}

  ngOnInit(): void {}

  onSave() {
    this.boardSharedService.announceBoardFormSaved(this.boardForm.value);
  }

  get name() {
    return this.boardForm.controls.name;
  }
}
