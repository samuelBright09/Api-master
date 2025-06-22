import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiClientService } from '../../services/api-client.service';
import { Post } from '../../interfaces/post';

@Component({
  selector: 'app-create-post',
  imports: [CommonModule, FormsModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.scss',
})
export class PostFormComponent implements OnInit {
  private apiClientService = inject(ApiClientService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  post: Post = {
    id: 0,
    title: '',
    body: '',
    userId: 1,
  };
  isEditing = false;
  successMessage = '';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.loadPost(+id);
    }
  }

  loadPost(id: number) {
    this.apiClientService.getPost(id).subscribe((post) => {
      this.post = post;
    });
  }

  submitPost() {
    if (this.isEditing) {
      this.apiClientService.editPost(this.post).subscribe(() => {
        this.successMessage = 'Post edited successfully!';
      });
      
    } else {
      this.apiClientService.addPost(this.post).subscribe(() => {
        this.successMessage = 'Post submitted successfully!';
      });
      
    }
    setTimeout(() => (this.goBack()), 3000);
  }

  goBack() {
    this.router.navigateByUrl('');
  }
  
}
