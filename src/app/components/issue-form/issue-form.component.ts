import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-issue-form',
  templateUrl: './issue-form.component.html',
  styleUrls: ['./issue-form.component.scss'],
})
export class IssueFormComponent implements OnInit {
  @Output() issueCreated = new EventEmitter();

  issueForm = new FormGroup({
    description: new FormControl(''),
    summary: new FormControl(''),

    type: new FormControl(''),
    status: new FormControl(''),
    resolution: new FormControl(''),

    assignee: new FormControl(''),
    reporter: new FormControl(''),

    created: new FormControl(''),
    updated: new FormControl(''),
    estimate: new FormControl(''),
  });

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    this.issueCreated.emit(this.issueForm.value);
  }
}
