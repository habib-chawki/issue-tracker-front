import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-issue-form',
  templateUrl: './issue-form.component.html',
  styleUrls: ['./issue-form.component.scss'],
})
export class IssueFormComponent implements OnInit {
  @Output() created = new EventEmitter();

  issueForm = new FormGroup({
    description: new FormControl(''),
  });

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    this.created.emit(this.issueForm.value);
  }
}
