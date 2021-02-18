import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectCommunicationService } from 'src/app/services/project-communication/project-communication.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit {
  projectForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(
    private projectCommunicationService: ProjectCommunicationService
  ) {}

  ngOnInit(): void {}

  onSave() {
    this.projectCommunicationService.announceProjectFormSaved(
      this.projectForm.value
    );
  }

  get name() {
    return this.projectForm.controls.name;
  }
}
