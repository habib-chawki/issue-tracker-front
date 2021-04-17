import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IssueComponent } from './components/issue/issue.component';
import { BacklogComponent } from './components/backlog/backlog.component';
import { IssueFormComponent } from './forms/issue-form/issue-form.component';
import { IssueDetailsComponent } from './components/issue-details/issue-details.component';
import { SignupFormComponent } from './forms/signup-form/signup-form.component';
import { LoginFormComponent } from './forms/login-form/login-form.component';
import { CommentComponent } from './components/comment/comment.component';
import { CommentsComponent } from './components/comments/comments.component';
import { IssuesComponent } from './components/issues/issues.component';
import { ColumnComponent } from './components/column/column.component';
import { BoardComponent } from './components/board/board.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectComponent } from './components/project/project.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { ColumnFormComponent } from './forms/column-form/column-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { httpInterceptorProviders } from './interceptors/providers';
import { ProjectFormComponent } from './forms/project-form/project-form.component';
import { SprintFormComponent } from './forms/sprint-form/sprint-form.component';
import { SprintComponent } from './components/sprint/sprint.component';
import { BoardFormComponent } from './forms/board-form/board-form.component';
import { SprintsComponent } from './components/sprints/sprints.component';
import { SprintDetailsComponent } from './components/sprint-details/sprint-details.component';
import { UserComponent } from './components/user/user.component';
import { UsersComponent } from './components/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    IssueComponent,
    BacklogComponent,
    IssueFormComponent,
    IssueDetailsComponent,
    SignupFormComponent,
    LoginFormComponent,
    CommentComponent,
    CommentsComponent,
    IssuesComponent,
    ColumnComponent,
    BoardComponent,
    ColumnFormComponent,
    ProjectsComponent,
    ProjectComponent,
    ProjectFormComponent,
    SprintFormComponent,
    SprintComponent,
    BoardFormComponent,
    SprintsComponent,
    SprintDetailsComponent,
    UserComponent,
    UsersComponent,
  ],
  imports: [
    DragDropModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
