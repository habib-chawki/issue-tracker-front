import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IssueComponent } from './components/issue/issue.component';
import { IssuesComponent } from './components/issues/issues.component';

@NgModule({
  declarations: [
    AppComponent,
    IssueComponent,
    IssuesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
