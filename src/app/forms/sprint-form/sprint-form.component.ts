import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { SprintSharedService } from 'src/app/services/sprint-intercom/sprint-intercom.service';

@Component({
  selector: 'app-sprint-form',
  templateUrl: './sprint-form.component.html',
  styleUrls: ['./sprint-form.component.scss'],
})
export class SprintFormComponent implements OnInit {
  SPRINT_DURATION = 30;
  sprintMinDate: Date = new Date();
  sprintMaxDate: Date;

  sprintForm = new FormGroup({
    name: new FormControl('', Validators.required),
    goal: new FormControl('', Validators.required),
    dateRange: new FormGroup({
      startDate: new FormControl(
        moment().format('yyyy-MM-dd'),
        Validators.required
      ),
      endDate: new FormControl(Validators.required),
    }),
  });

  constructor(
    private sprintSharedService: SprintSharedService,
    private dialogRef: MatDialogRef<SprintFormComponent>
  ) {}

  ngOnInit(): void {}

  onSave() {
    if (this.sprintForm.valid) {
      // extract startDate and endDate
      const { startDate, endDate } = this.sprintForm.controls.dateRange.value;

      const formValue = {
        ...this.sprintForm.value,
        startDate: this.parseDate(startDate),
        endDate: this.parseDate(endDate),
      };

      // remove date range
      delete formValue.dateRange;

      // announce form saved with the custom form value
      this.sprintSharedService.announceSprintFormSaved(formValue);

      // close sprint form dialog
      this.dialogRef.close();
    } else {
      console.log('INVALID SPRINT FORM');
    }
  }

  onDateRangeChange(event) {
    const pickedDate = new Date(event.value);

    this.sprintMaxDate = new Date(
      pickedDate.getFullYear(),
      pickedDate.getMonth(),
      pickedDate.getDate() + this.SPRINT_DURATION
    );
  }

  parseDate(date) {
    const dateFormat = 'YYYY-MM-DD';
    return moment(date).format(dateFormat);
  }

  get name() {
    return this.sprintForm.controls.name;
  }

  get goal() {
    return this.sprintForm.controls.goal;
  }
}
