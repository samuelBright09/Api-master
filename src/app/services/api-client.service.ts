import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  Observable,
  of,
  retry,
  tap,
  throwError,
} from 'rxjs';
import { Comments, Post } from '../interfaces/post';
import { ErrorHandlingService } from './error-handling.service';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApiClientService  {
  private BASE_URL = `${environment.apiUrl}`;
  private postSubject = new BehaviorSubject<Post[]>([]);
  public posts$ = this.postSubject.asObservable();

  private cache: Map<string, { timeStamp: number; data: Post[] }> = new Map();
  private cacheDuration = 5 * 60 * 1000; // 5 minutes

  private errorHandlingService = inject(ErrorHandlingService);
  private http = inject(HttpClient);
  // private authService = inject(AuthService);

  constructor() {
    const cacheKey = 'posts';
    if (this.isCacheValid(cacheKey)) {
      this.postSubject.next(this.cache.get(cacheKey)!.data);
    } else {
      this.fetchPosts();
    }
  }

  private isCacheValid(cacheKey: string): boolean {
    const cached = this.cache.get(cacheKey);
    if (!cached) return false;
    const now = Date.now();
    return now - cached.timeStamp < this.cacheDuration;
  }

  private setCache(cacheKey: string, data: Post[]): void {
    this.cache.set(cacheKey, { timeStamp: Date.now(), data });
  }

  public clearCache(): void {
    this.cache.clear();
  }

  fetchPosts(): void {
    
    this.http
      .get<Post[]>(this.BASE_URL)
      .pipe(
        retry(2),
        catchError((error) => {
          this.errorHandlingService.handleError(error);
          return of([]); //send empty array as a fallback
        })
      )
      .subscribe((posts) => {
        this.postSubject.next(posts);
      });
  }

  getPosts(): Observable<Post[]> {
    return this.posts$;
  }

  getPost(id: number): Observable<Post> {
    const cacheKey = `post-${id}`;
    if (this.isCacheValid(cacheKey)) {
      // Find the post with the given id in the cached posts array
      const cachedPosts = this.cache.get(cacheKey)!.data;
      const post = Array.isArray(cachedPosts)
        ? cachedPosts.find((p) => p.id === id)
        : cachedPosts;
      if (post) {
        return of(post);
      }
    }

    return this.http.get<Post>(`${this.BASE_URL}/${id}`).pipe(
      retry(3),
      catchError((err) => this.errorHandlingService.handleError(err)),
      tap((post) => this.setCache(cacheKey, [post]))
    );
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.BASE_URL, post).pipe(
      retry(3),
      catchError((err) => this.errorHandlingService.handleError(err)),
      tap((newPost) => {
        this.clearCache();
        const currentPosts = this.postSubject.value;
        this.postSubject.next([...currentPosts, newPost]);
      })
    );
  }

  editPost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.BASE_URL}/${post.id}`, post).pipe(
      retry(3),
      catchError((err) => this.errorHandlingService.handleError(err)),
      tap((updatedPost) => {
        this.clearCache();
        const currentPosts = this.postSubject.value;
        const index = currentPosts.findIndex((p) => p.id === updatedPost.id);
        currentPosts[index] = updatedPost;
        this.postSubject.next(currentPosts);
      })
    );
  }

  deletePost(id: number): Observable<Post> {
    return this.http.delete<Post>(`${this.BASE_URL}/${id}`).pipe(
      retry(3),
      catchError((err) => this.errorHandlingService.handleError(err)),
      tap(() => {
        const currentPosts = this.postSubject.value;
        const index = currentPosts.findIndex((p) => p.id === id);
        if (index !== -1) {
          currentPosts.splice(index, 1);
          this.postSubject.next(currentPosts);
        }
      })
    );
  }

  getPostWithComments(id: number): Observable<Comments[]> {
    return this.http.get<Comments[]>(`${this.BASE_URL}/${id}/comments`).pipe(
      retry(3),
      catchError((err) => this.errorHandlingService.handleError(err))
    );
  }
}
