import { Component, Input, OnInit } from '@angular/core';
import { Issue } from 'src/app/models/issue/issue';
import { IssueService } from 'src/app/services/api/issue/issue.service';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss'],
})
export class IssuesComponent implements OnInit {
  @Input() issues: Issue[] = [];

  constructor(private issueService: IssueService) {}

  ngOnInit(): void {}

  // invoked when the issue remove button is clicked
  onRemoveIssue(issue: Issue) {
    this.issueService.deleteIssue(issue.id).subscribe(() => {
      const index = this.issues.indexOf(issue);
      this.issues.splice(index, 1);
    });
  }
}
