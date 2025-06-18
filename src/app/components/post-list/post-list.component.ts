import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Post } from '../../interfaces/post';

@Component({
  selector: 'app-post-list',
  imports: [],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent {
  postsData: Post[] = [];
  apiService: ApiService = inject(ApiService);

  constructor() {
    this.getPosts();
  }

  getPosts(): void {
    this.apiService.getData().subscribe((data) => {
      this.postsData = data;
    });
  }
}
