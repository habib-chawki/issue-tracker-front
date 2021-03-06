import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import IssueResolution from 'src/app/models/enums/issue-resolution';
import IssueStatus from 'src/app/models/enums/issue-status';
import IssueType from 'src/app/models/enums/issue-type';

@Component({
  selector: 'app-issue-form',
  templateUrl: './issue-form.component.html',
  styleUrls: ['./issue-form.component.scss'],
})
export class IssueFormComponent implements OnInit {
  @Output() issueFormSaved = new EventEmitter();
  @Output() issueFormCancelled = new EventEmitter();

  @Input() initialFormValue = {};

  issueTypes = Object.values(IssueType);
  issueStatuses = Object.values(IssueStatus);
  issueResolutions = Object.values(IssueResolution);

  issueForm = new FormGroup({
    description: new FormControl(''),
    summary: new FormControl(''),

    type: new FormControl(IssueType.Story),
    status: new FormControl(IssueStatus.Todo),
    resolution: new FormControl(IssueResolution.Unresolved),

    assignee: new FormControl(''),

    estimate: new FormControl(''),
  });

  constructor() {}

  ngOnInit(): void {
    if (this.initialFormValue) {
      this.issueForm.patchValue(this.initialFormValue);
    }
  }

  onSave() {
    this.issueFormSaved.emit(this.issueForm.value);
  }

  onCancel() {
    this.issueFormCancelled.emit();
  }
}
