import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IssueComponent } from './components/issue/issue.component';
import { Backlog } from './components/backlog/backlog.component';
import { IssueFormComponent } from './components/issue-form/issue-form.component';
import { IssueDetailsComponent } from './components/issue-details/issue-details.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { CommentComponent } from './components/comment/comment.component';
import { CommentsComponent } from './components/comments/comments.component';
import { IssuesComponent } from './components/issues/issues.component';
import { ColumnComponent } from './components/column/column/column.component';
import { BoardComponent } from './components/board/board.component';

@NgModule({
  declarations: [
    AppComponent,
    IssueComponent,
    Backlog,
    IssueFormComponent,
    IssueDetailsComponent,
    SignupFormComponent,
    LoginFormComponent,
    CommentComponent,
    CommentsComponent,
    IssuesComponent,
    ColumnComponent,
    BoardComponent,
  ],
  imports: [ReactiveFormsModule, BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
