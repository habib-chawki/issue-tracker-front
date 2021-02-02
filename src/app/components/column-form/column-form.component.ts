import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-column-form',
  templateUrl: './column-form.component.html',
  styleUrls: ['./column-form.component.scss'],
})
export class ColumnFormComponent implements OnInit {
  @Output() columnFormSaved = new EventEmitter();
  @Output() columnFormCancelled = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onSave() {
    this.columnFormSaved.emit();
  }

  onCancel() {
    this.columnFormCancelled.emit();
  }
}
