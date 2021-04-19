import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BacklogComponent } from './components/backlog/backlog.component';
import { BoardComponent } from './components/board/board.component';
import { LoginFormComponent } from './forms/login-form/login-form.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SignupFormComponent } from './forms/signup-form/signup-form.component';
import { SprintsComponent } from './components/sprints/sprints.component';
import { UsersComponent } from './components/users/users.component';
import { ProductComponent } from './components/product/product.component';

export const routes: Routes = [
  { path: 'signup', component: SignupFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'projects', component: ProjectsComponent },
  {
    path: 'product',
    component: ProductComponent,
    children: [
      { path: 'backlog', component: BacklogComponent },
      { path: 'board', component: BoardComponent },
      { path: 'sprints', component: SprintsComponent },
      { path: 'devs', component: UsersComponent },
    ],
  },

  { path: '', redirectTo: 'signup', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
