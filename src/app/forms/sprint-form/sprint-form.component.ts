import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { SprintIntercomService } from 'src/app/services/sprint-intercom/sprint-intercom.service';

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

  constructor(private sprintIntercomService: SprintIntercomService) {}

  ngOnInit(): void {}

  onSave() {
    // extract and parse startDate and endDate
    const startDate = moment(
      this.sprintForm.controls.dateRange.value.startDate
    ).format('YYYY-MM-DD');

    const endDate = moment(
      this.sprintForm.controls.dateRange.value.endDate
    ).format('YYYY-MM-DD');

    const formValue = {
      ...this.sprintForm.value,
      startDate,
      endDate,
    };

    // remove date range
    delete formValue.dateRange;

    // announce form saved with the custom form value
    this.sprintIntercomService.announceSprintFormSaved(formValue);
  }

  onDateRangeChange(event) {
    const pickedDate = new Date(event.value);

    this.sprintMaxDate = new Date(
      pickedDate.getFullYear(),
      pickedDate.getMonth(),
      pickedDate.getDate() + this.SPRINT_DURATION
    );
  }

  get name() {
    return this.sprintForm.controls.name;
  }

  get goal() {
    return this.sprintForm.controls.goal;
  }
}
