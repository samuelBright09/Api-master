import { Component, inject, OnInit } from '@angular/core';
import { Comments, Post } from '../../interfaces/post';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiClientService } from '../../services/api-client.service';
import { forkJoin, map, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-detail',
  imports: [CommonModule, FormsModule],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss'
})
export class PostDetailComponent implements OnInit {
postId! : number
comments! : Comments []
post! : Post
successMessage = ''


private router = inject(Router)
private route = inject(ActivatedRoute)
private apiClientService = inject(ApiClientService)

ngOnInit(): void {
  this.route.paramMap.pipe(
     map(params => Number(params.get('id'))),
        tap(id => this.postId = id),
        switchMap(id =>
          forkJoin({
            post: this.apiClientService.getPost(id),
            comments: this.apiClientService.getPostWithComments(id)
          }) 
        )
  ).subscribe({
    next: ({ post, comments }) => {
          this.post = post;
          this.comments = comments 
        }
  })
}


   goBack() {
    this.router.navigateByUrl('');
  }

  editPost() {
    this.router.navigateByUrl(`edit/${this.postId}`);
  }

  deletePost(){
    this.apiClientService.deletePost(this.postId).subscribe({
      next: () => {
        this.successMessage = 'Post deleted successfully!';
        setTimeout(() => this.goBack(), 3000);
      }
    })
  }




}
