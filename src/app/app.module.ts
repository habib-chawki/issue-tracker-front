import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { httpInterceptorProviders } from './interceptors/providers';

// material
import { DragDropModule } from '@angular/cdk/drag-drop';
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
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';

// components
import { IssueComponent } from './components/issue/issue.component';
import { BacklogComponent } from './components/backlog/backlog.component';
import { IssueDetailsComponent } from './components/issue-details/issue-details.component';
import { CommentComponent } from './components/comment/comment.component';
import { CommentsComponent } from './components/comments/comments.component';
import { IssuesComponent } from './components/issues/issues.component';
import { ColumnComponent } from './components/column/column.component';
import { BoardComponent } from './components/board/board.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectComponent } from './components/project/project.component';
import { SprintComponent } from './components/sprint/sprint.component';
import { SprintDetailsComponent } from './components/sprint-details/sprint-details.component';
import { UserComponent } from './components/user/user.component';
import { UsersComponent } from './components/users/users.component';
import { ProductComponent } from './components/product/product.component';
import { DevComponent } from './components/dev/dev.component';
import { DevsComponent } from './components/devs/devs.component';
import { SprintsComponent } from './components/sprints/sprints.component';
import { IssueFormComponent } from './forms/issue-form/issue-form.component';
import { SignupFormComponent } from './forms/signup-form/signup-form.component';
import { LoginFormComponent } from './forms/login-form/login-form.component';
import { ProjectFormComponent } from './forms/project-form/project-form.component';
import { SprintFormComponent } from './forms/sprint-form/sprint-form.component';
import { BoardFormComponent } from './forms/board-form/board-form.component';
import { ColumnFormComponent } from './forms/column-form/column-form.component';

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
    ProductComponent,
    DevComponent,
    DevsComponent,
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
    MatMomentDateModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatTooltipModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatDividerModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
