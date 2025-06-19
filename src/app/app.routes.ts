import { Routes } from '@angular/router';
import { PostListComponent } from './components/post-list/post-list.component';
import { CreatePostComponent } from './components/post-form/post-form.component';

export const routes: Routes = [
  {
    path: '',
    component: PostListComponent,
  },
  {
    path: 'create',
    component: CreatePostComponent
  },
];
