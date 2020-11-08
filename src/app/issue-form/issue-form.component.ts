import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-issue-form',
  templateUrl: './issue-form.component.html',
  styleUrls: ['./issue-form.component.scss']
})
export class IssueFormComponent implements OnInit {
 
  issueForm = new FormGroup({
    description: new FormControl()
  });

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('called');
  }

}
