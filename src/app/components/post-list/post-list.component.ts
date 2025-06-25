import { Component, inject, OnInit } from '@angular/core';
import { ApiClientService } from '../../services/api-client.service';
import { Post } from '../../interfaces/post';
import { PostCardComponent } from '../post-card/post-card.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { LoadingModalComponent } from '../loading-modal/loading-modal.component';

@Component({
  selector: 'app-post-list',
  imports: [PostCardComponent, PaginationComponent, LoadingModalComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent implements OnInit {
  allPosts: Post[] = [];
  paginatedPosts: Post[] = [];
  currentPage: number = 1;
  postsPerPage: number = 10;
  apiClientService = inject(ApiClientService);
  loading: boolean = false;

  ngOnInit() {
    this.getPosts();
  }

  getPosts(): void {

    this.loading = true;

    this.apiClientService.posts$.subscribe((posts) => {
      this.allPosts = posts;
      this.loading = false;
      this.updatePaginatedPosts();
    });
  }

  updatePaginatedPosts(): void {
    const startIndex = (this.currentPage - 1) * this.postsPerPage;
    const endIndex = startIndex + this.postsPerPage; 
    this.paginatedPosts = this.allPosts.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePaginatedPosts();
  }
}
