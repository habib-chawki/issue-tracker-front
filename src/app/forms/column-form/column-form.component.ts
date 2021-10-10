import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ColumnSharedService } from 'src/app/services/shared/column/column-shared.service';

@Component({
  selector: 'app-column-form',
  templateUrl: './column-form.component.html',
  styleUrls: ['./column-form.component.scss'],
})
export class ColumnFormComponent implements OnInit {
  columnForm = new FormGroup({
    title: new FormControl('', Validators.required),
  });

  constructor(private columnSharedService: ColumnSharedService) {}

  ngOnInit(): void {}

  onSave() {
    // announce column form saved with valid title
    if (this.columnForm.value.title.trim()) {
      this.columnSharedService.announceColumnFormSaved(this.columnForm.value);
    }
  }

  get title() {
    return this.columnForm.controls.title;
  }
}
