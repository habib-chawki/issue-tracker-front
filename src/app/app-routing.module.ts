import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Backlog } from './components/backlog/backlog.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';

export const routes: Routes = [
  { path: '', component: Backlog },
  { path: 'signup', component: SignupFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
