import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import IssuePriority from 'src/app/models/enums/issue-priority';

import IssueStatus from 'src/app/models/enums/issue-status';
import IssueType from 'src/app/models/enums/issue-type';
import { Issue } from 'src/app/models/issue/issue';
import { IssueIntercomService } from 'src/app/services/issue-intercom/issue-intercom.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-issue-form',
  templateUrl: './issue-form.component.html',
  styleUrls: ['./issue-form.component.scss'],
})
export class IssueFormComponent implements OnInit {
  issuePriorities = Object.values(IssuePriority);
  issueTypes = Object.values(IssueType);
  issueStatuses = Object.values(IssueStatus);

  issueForm = new FormGroup({
    description: new FormControl(''),
    summary: new FormControl(''),

    priority: new FormControl(IssuePriority.MEDIUM),
    type: new FormControl(IssueType.STORY),

    assignee: new FormControl(''),

    points: new FormControl(1),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData,
    private issueCommunicationService: IssueIntercomService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if (this.dialogData) {
      this.issueForm.patchValue(this.dialogData);
    }
  }

  onSave() {
    let issue: Issue = this.issueForm.value;

    // add the original issue "id" if the issue is to be updated rather than created
    if (this.dialogData) {
      issue = {
        id: this.dialogData.id,
        ...issue,
      };
    }

    this.issueCommunicationService.announceIssueFormSaved(issue);
  }

  onLoadAssignees() {
    this.userService
      .getUsersByAssignedProject(this.dialogData.projectId)
      .subscribe({
        next: (response) => {
          console.log(JSON.stringify(response));
        },
      });
  }
}
