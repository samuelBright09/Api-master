import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Comments, Post } from '../interfaces/post';

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  private BASE_URL = 'https://jsonplaceholder.typicode.com/posts';
  private postSubject = new BehaviorSubject<Post[]>([]);
  public posts$ = this.postSubject.asObservable();

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

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.BASE_URL}/${id}`);
  }

  addPost(post: Post): Observable<Post>{
    return this.http.post<Post>(this.BASE_URL, post)  
  }

  editPost(post: Post): Observable<Post>{
    return this.http.put<Post>(`${this.BASE_URL}/${post.id}`, post)  
  }

  deletePost(id: number): Observable<Post>{
    return this.http.delete<Post>(`${this.BASE_URL}/${id}`)  
  }

  getPostWithComments(id: number): Observable<Comments[]> {
    return this.http.get<Comments[]>(`${this.BASE_URL}/${id}/comments`);
  }





}
