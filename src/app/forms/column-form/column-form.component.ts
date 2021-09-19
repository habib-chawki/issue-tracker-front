import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ColumnIntercomService } from 'src/app/services/column-intercom/column-intercom.service';

@Component({
  selector: 'app-column-form',
  templateUrl: './column-form.component.html',
  styleUrls: ['./column-form.component.scss'],
})
export class ColumnFormComponent implements OnInit {
  columnForm = new FormGroup({
    title: new FormControl('', Validators.required),
  });

  constructor(private columnCommunicationService: ColumnIntercomService) {}

  ngOnInit(): void {}

  onSave() {
    // announce column form saved with valid title
    if (this.columnForm.value.title.trim()) {
      this.columnCommunicationService.announceColumnFormSaved(
        this.columnForm.value
      );
    }
  }

  get title() {
    return this.columnForm.controls.title;
  }
}
