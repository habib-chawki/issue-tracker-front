import { Component, OnInit } from '@angular/core';
import { Issue } from 'src/app/models/issue/issue';
import { IssueCommunicationService } from 'src/app/services/issue-communication/issue-communication.service';

@Component({
  selector: 'app-issue-details',
  templateUrl: './issue-details.component.html',
  styleUrls: ['./issue-details.component.scss'],
})
export class IssueDetailsComponent implements OnInit {
  issue: Issue = {} as Issue;

  constructor(private issueCommunicationService: IssueCommunicationService) {}

  ngOnInit(): void {
    this.issueCommunicationService.issueClicked.subscribe((response) => {
      this.issue = response;
    });
  }
}
