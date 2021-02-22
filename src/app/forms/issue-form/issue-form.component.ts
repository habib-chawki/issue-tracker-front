import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import IssuePriority from 'src/app/models/enums/issue-priority';

import IssueResolution from 'src/app/models/enums/issue-resolution';
import IssueStatus from 'src/app/models/enums/issue-status';
import IssueType from 'src/app/models/enums/issue-type';
import { Issue } from 'src/app/models/issue/issue';
import { IssueIntercomService } from 'src/app/services/issue-intercom/issue-intercom.service';

@Component({
  selector: 'app-issue-form',
  templateUrl: './issue-form.component.html',
  styleUrls: ['./issue-form.component.scss'],
})
export class IssueFormComponent implements OnInit {
  issuePriorities = Object.values(IssuePriority);
  issueTypes = Object.values(IssueType);
  issueStatuses = Object.values(IssueStatus);
  issueResolutions = Object.values(IssueResolution);

  issueForm = new FormGroup({
    description: new FormControl(''),
    summary: new FormControl(''),

    priority: new FormControl(IssuePriority.medium),

    type: new FormControl(IssueType.Story),
    status: new FormControl(IssueStatus.Todo),
    resolution: new FormControl(IssueResolution.Unresolved),

    assignee: new FormControl(''),

    estimate: new FormControl(''),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public initialFormValue,
    private issueCommunicationService: IssueIntercomService
  ) {}

  ngOnInit(): void {
    if (this.initialFormValue) {
      this.issueForm.patchValue(this.initialFormValue);
    }
  }

  onSave() {
    let issue: Issue = this.issueForm.value;

    // add the original issue "id" if the issue is to be updated rather than created
    if (this.initialFormValue) {
      issue = {
        id: this.initialFormValue.id,
        ...issue,
      };
    }

    this.issueCommunicationService.announceIssueFormSaved(issue);
  }
}
