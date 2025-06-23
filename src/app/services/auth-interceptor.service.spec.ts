import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AuthInterceptorService } from './auth-interceptor.service';
import { AuthService } from './auth.service';

describe('AuthInterceptorService', () => {
  let http: HttpClient;
  let httpController: HttpTestingController;

  const mockToken = 'mock-token-123';

  const mockAuthService = {
    getToken: () => mockToken
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptorService,
          multi: true,
        },
      ],
    });

    http = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should add Authorization header if token exists', () => {
    http.get('/test').subscribe();

    const req = httpController.expectOne('/test');
    expect(req.request.headers.has('Authorization')).toBeTrue();
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);
  });

  it('should NOT add Authorization header if no token', () => {
    // Override mockAuthService to return no token
    TestBed.overrideProvider(AuthService, {
      useValue: { getToken: () => '' }
    });

    http.get('/test').subscribe();

    const req = httpController.expectOne('/test');
    expect(req.request.headers.has('Authorization')).toBeFalse();
  });
});
