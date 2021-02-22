import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SprintIntercomService } from 'src/app/services/sprint-intercom/sprint-intercom.service';

@Component({
  selector: 'app-sprint-form',
  templateUrl: './sprint-form.component.html',
  styleUrls: ['./sprint-form.component.scss'],
})
export class SprintFormComponent implements OnInit {
  sprintForm = new FormGroup({
    name: new FormControl('', Validators.required),
    goal: new FormControl('', Validators.required),
    startDate: new FormControl(Date.now, Validators.required),
    endDate: new FormControl(new Date().getDate() + 30, Validators.required),
  });

  constructor(private sprintIntercomService: SprintIntercomService) {}

  ngOnInit(): void {}

  onSave() {
    this.sprintIntercomService.announceSprintFormSaved(this.sprintForm.value);
  }

  get name() {
    return this.sprintForm.controls.name;
  }

  get goal() {
    return this.sprintForm.controls.goal;
  }
}
