import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import IssueResolution from 'src/app/models/enums/issue-resolution';
import IssueStatus from 'src/app/models/enums/issue-status';
import IssueType from 'src/app/models/enums/issue-type';
import { IssueCommunicationService } from 'src/app/services/issue-communication/issue-communication.service';

@Component({
  selector: 'app-issue-form',
  templateUrl: './issue-form.component.html',
  styleUrls: ['./issue-form.component.scss'],
})
export class IssueFormComponent implements OnInit {
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

  constructor(private issueCommunicationService: IssueCommunicationService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.issueCommunicationService.announceIssueCreated(this.issueForm.value);
  }
}
