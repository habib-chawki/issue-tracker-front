import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-column-form',
  templateUrl: './column-form.component.html',
  styleUrls: ['./column-form.component.scss'],
})
export class ColumnFormComponent implements OnInit {
  @Output() columnFormSaved = new EventEmitter();
  @Output() columnFormCancelled = new EventEmitter();

  columnForm = new FormGroup({
    title: new FormControl(),
  });

  constructor() {}

  ngOnInit(): void {}

  onSave() {
    this.columnFormSaved.emit(this.columnForm.value);
  }

  onCancel() {
    this.columnFormCancelled.emit();
  }
}
