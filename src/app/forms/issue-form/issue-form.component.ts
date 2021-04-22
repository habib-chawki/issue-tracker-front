import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import IssuePriority from 'src/app/models/enums/issue-priority';

import IssueStatus from 'src/app/models/enums/issue-status';
import IssueType from 'src/app/models/enums/issue-type';
import { Issue } from 'src/app/models/issue/issue';
import { User } from 'src/app/models/user/user';
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

  assignees: User[] = [];
  isAssigneesListLoading = true;

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
    // pre populate the form in case of an update
    if (this.dialogData) {
      this.issueForm.patchValue(this.dialogData);
    }

    // load the list of assignees
    this.loadAssignees();
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

    console.log('ISSUE TO BE SAVED: ' + JSON.stringify(issue));
    this.issueCommunicationService.announceIssueFormSaved(issue);
  }

  loadAssignees = () => {
    this.userService
      .getUsersByAssignedProject(this.dialogData.projectId)
      .subscribe({
        next: (response: User[]) => {
          this.assignees = response;
          console.log('ASSIGNEES: ' + JSON.stringify(this.assignees));
          this.isAssigneesListLoading = false;

          // set the project owner as default assingee
          this.issueForm.controls.assignee.setValue(this.assignees[0]);
        },
      });
  };
}
