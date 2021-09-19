import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectCommunicationService } from 'src/app/services/project-intercom/project-intercom.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit {
  projectForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  constructor(private projectSharedService: ProjectCommunicationService) {}

  ngOnInit(): void {}

  onSave() {
    // announce project form saved only when project name is valid
    if (this.projectForm.value.name.trim()) {
      this.projectSharedService.announceProjectFormSaved(
        this.projectForm.value
      );
    }
  }

  get name() {
    return this.projectForm.controls.name;
  }
}
