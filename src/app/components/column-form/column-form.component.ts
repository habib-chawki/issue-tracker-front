import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ColumnCommunicationService } from 'src/app/services/column-communication/column-communication.service';

@Component({
  selector: 'app-column-form',
  templateUrl: './column-form.component.html',
  styleUrls: ['./column-form.component.scss'],
})
export class ColumnFormComponent implements OnInit {
  @Output() columnFormSaved = new EventEmitter();
  @Output() columnFormCancelled = new EventEmitter();

  columnForm = new FormGroup({
    title: new FormControl('', Validators.required),
  });

  constructor(private columnCommunicationService: ColumnCommunicationService) {}

  ngOnInit(): void {}

  onSave() {
    this.columnCommunicationService.announceColumnFormSaved(
      this.columnForm.value
    );
  }

  onCancel() {
    this.columnFormCancelled.emit();
  }
}
