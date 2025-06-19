import { Component, Input } from '@angular/core';
import { Post } from '../../interfaces/post';
import { UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-card',
  imports: [UpperCasePipe, RouterLink],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss'
})
export class PostCardComponent {

 @Input() post!: Post





}
