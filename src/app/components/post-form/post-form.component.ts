import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiClientService } from '../../services/api-client.service';

@Component({
  selector: 'app-create-post',
  imports: [CommonModule, FormsModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.scss',
})
export class CreatePostComponent {
  private apiClientService = inject(ApiClientService)
  private router = inject(Router);

  post = {
    title: '',
    body: '',
    userId: 1,
  };

  successMessage = '';

  submitPost() {
    this.apiClientService
      .addPost(this.post)
      .subscribe((response) => {
        console.log('Post created:', response);
        this.successMessage = 'Post submitted successfully!';
      });
      this.goBack()
  }

  goBack(){
    this.router.navigateByUrl('');
  }
}
