import { TestBed } from '@angular/core/testing';
import { ApiClientService } from './api-client.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Post } from '../interfaces/post';

describe('ApiClientService', () => {
  let service: ApiClientService;
  let httpMock: HttpTestingController;

  const baseUrl = environment.apiUrl;
  const mockPost: Post = {
    userId: 1,
    id: 1,
    title: 'Test Title',
    body: 'Test Body'
  };

  const mockAuthService = {
    isAuthenticated: () => true
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ApiClientService,
        { provide: AuthService, useValue: mockAuthService }
      ]
    });

    service = TestBed.inject(ApiClientService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch posts and cache them if authenticated', () => {
    service.fetchPosts();

    const req = httpMock.expectOne(`${baseUrl}?userId=1`);
    expect(req.request.method).toBe('GET');
    req.flush([mockPost]);

    service.getPosts().subscribe((posts) => {
      expect(posts.length).toBe(1);
      expect(posts[0].title).toBe('Test Title');
    });
  });

  it('should get a single post by id and cache it', () => {
    service.getPost(1).subscribe((post) => {
      expect(post.id).toBe(1);
      expect(post.title).toBe('Test Title');
    });

    const req = httpMock.expectOne(`${baseUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPost);
  });

  it('should add a post and update posts$', () => {
    service['postSubject'].next([mockPost]);

    const newPost: Post = {
      userId: 1,
      id: 2,
      title: 'New Post',
      body: 'New Body'
    };

    service.addPost(newPost).subscribe((post) => {
      expect(post.title).toBe('New Post');
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    req.flush(newPost);

    service.getPosts().subscribe((posts) => {
      expect(posts.length).toBe(2);
    });
  });

  it('should edit a post and update posts$', () => {
    service['postSubject'].next([mockPost]);

    const updatedPost = { ...mockPost, title: 'Updated Title' };

    service.editPost(updatedPost).subscribe((post) => {
      expect(post.title).toBe('Updated Title');
    });

    const req = httpMock.expectOne(`${baseUrl}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedPost);

    service.getPosts().subscribe((posts) => {
      expect(posts[0].title).toBe('Updated Title');
    });
  });

  it('should delete a post and update posts$', () => {
    service['postSubject'].next([mockPost]);

    service.deletePost(1).subscribe();

    const req = httpMock.expectOne(`${baseUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});

    service.getPosts().subscribe((posts) => {
      expect(posts.length).toBe(0);
    });
  });
});
