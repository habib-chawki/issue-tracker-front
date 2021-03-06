import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BoardIntercomService } from 'src/app/services/board-intercom/board-intercom.service';

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html',
  styleUrls: ['./board-form.component.scss'],
})
export class BoardFormComponent implements OnInit {
  boardForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(private boardIntercomService: BoardIntercomService) {}

  ngOnInit(): void {}

  onSave() {
    this.boardIntercomService.announceBoardFormSaved(this.boardForm.value);
  }
}
