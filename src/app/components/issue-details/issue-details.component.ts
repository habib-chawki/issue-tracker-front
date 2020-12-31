import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Issue } from 'src/app/models/issue/issue';
import { IssueCommunicationService } from 'src/app/services/issue-communication/issue-communication.service';

@Component({
  selector: 'app-issue-details',
  templateUrl: './issue-details.component.html',
  styleUrls: ['./issue-details.component.scss'],
})
export class IssueDetailsComponent implements OnInit {
  @Input() issue: Issue = {} as Issue;

  @Output() issueDetailsClosed = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClose() {
    this.issueDetailsClosed.emit();
  }
}
