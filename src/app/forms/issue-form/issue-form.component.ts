import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import IssuePriority from 'src/app/models/enums/issue-priority';

import IssueStatus from 'src/app/models/enums/issue-status';
import IssueType from 'src/app/models/enums/issue-type';
import { Issue } from 'src/app/models/issue/issue';
import { User } from 'src/app/models/user/user';
import { IssueSharedService } from 'src/app/services/shared/issue/issue-shared.service';
import { UserService } from 'src/app/services/api/user/user.service';

@Component({
  selector: 'app-issue-form',
  templateUrl: './issue-form.component.html',
  styleUrls: ['./issue-form.component.scss'],
})
export class IssueFormComponent implements OnInit {
  projectId;

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
    private issueSharedService: IssueSharedService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // extract project id
    this.route.queryParams.subscribe({
      next: (queryParams) => {
        this.projectId = queryParams.project;
      },
    });

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

      // when the issue is to be updated, preserve its properties and replace the ones to be updated
      if (this.dialogData) {
        issue = {
          ...this.dialogData,
          ...issue,
        };
      }

      console.log('ISSUE TO BE SAVED: ' + JSON.stringify(issue));
      this.issueSharedService.announceIssueFormSaved(issue);

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
      .getUsersByAssignedProject(this.projectId, PAGE, PAGE_SIZE)
      .subscribe({
        next: (response: User[]) => {
          this.assignees = response;
          console.log('ASSIGNEES: ' + JSON.stringify(this.assignees));
          this.isAssigneesListLoading = false;

          // set the assignee based on whether the issue is to be created or updated
          let assignee = this.assignees[0];

          if (this.dialogData) {
            assignee = this.assignees.find(
              (user) => this.dialogData.assignee.id == user.id
            );
          }

          this.issueForm.controls.assignee.setValue(assignee);
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
