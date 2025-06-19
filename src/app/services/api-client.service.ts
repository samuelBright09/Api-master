import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from '../interfaces/post';

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  private BASE_URL = 'https://jsonplaceholder.typicode.com/posts';
  private postSubject = new BehaviorSubject<Post[]>([]);
  private posts$ = this.postSubject.asObservable();

  private http = inject(HttpClient);

  constructor() {
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.http.get<Post[]>(this.BASE_URL).subscribe((posts) => {
      this.postSubject.next(posts);
    });
  }

  getPosts(): Observable<Post[]> {
    return this.posts$;
  }

  addPost(post: Post): Observable<Post>{
    return this.http.post<Post>(this.BASE_URL, post)  
  }





}
