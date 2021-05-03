import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    description: new FormControl('', Validators.required),
    summary: new FormControl('', Validators.required),

    priority: new FormControl(IssuePriority.MEDIUM, Validators.required),
    type: new FormControl(IssueType.STORY, Validators.required),

    assignee: new FormControl(''),

    points: new FormControl(1, Validators.required),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData,
    private dialogRef: MatDialogRef<IssueFormComponent>,
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
    if (this.issueForm.valid) {
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

      // close the dialog
      this.dialogRef.close();
    } else {
      console.log('INVALID ISSUE FORM');
    }
  }

  loadAssignees = () => {
    const PAGE = 0;
    const PAGE_SIZE = 10;

    this.userService
      .getUsersByAssignedProject(this.dialogData.projectId, PAGE, PAGE_SIZE)
      .subscribe({
        next: (response: User[]) => {
          this.assignees = response;
          console.log('ASSIGNEES: ' + JSON.stringify(this.assignees));
          this.isAssigneesListLoading = false;

          // set the project owner as default assingee
          this.issueForm.controls.assignee.setValue(this.assignees[0]);
        },
        error: (error) => {
          console.log('ERROR FETCHING ASSIGNEES' + JSON.stringify(error));
        },
      });
  };

  get description() {
    return this.issueForm.controls.description;
  }

  get summary() {
    return this.issueForm.controls.summary;
  }
}
