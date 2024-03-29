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
import { DevsComponent } from './components/devs/devs.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'signup', component: SignupFormComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginFormComponent, canActivate: [AuthGuard] },
  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
  {
    path: 'product',
    component: ProductComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'backlog', component: BacklogComponent },
      { path: 'board', component: BoardComponent },
      { path: 'sprints', component: SprintsComponent },
      { path: 'devs', component: DevsComponent },
      { path: 'users', component: UsersComponent },
    ],
  },

  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
