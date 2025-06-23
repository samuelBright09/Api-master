import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { AuthGuardService } from './services/auth-guard.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'create', component: PostFormComponent ,canActivate: [AuthGuardService]},
  { path: 'edit/:id', component: PostFormComponent , canActivate: [AuthGuardService]},
  { path: ':id', component: PostDetailComponent },
  { path: '**', redirectTo: 'not-found' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }