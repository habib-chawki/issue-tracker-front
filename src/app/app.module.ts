import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IssueComponent } from './components/issue/issue.component';
import { IssuesComponent } from './components/issues/issues.component';
import { IssueFormComponent } from './issue-form/issue-form.component';

@NgModule({
  declarations: [
    AppComponent,
    IssueComponent,
    IssuesComponent,
    IssueFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
