import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit {
  projectForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor() {}

  ngOnInit(): void {}

  onSave() {}

  get name() {
    return this.projectForm.controls.name;
  }
}
