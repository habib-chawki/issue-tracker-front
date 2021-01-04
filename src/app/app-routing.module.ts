import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Backlog } from './components/backlog/backlog.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';

export const routes: Routes = [
  { path: 'backlog', component: Backlog },
  { path: 'signup', component: SignupFormComponent },
  { path: 'login', component: LoginFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
