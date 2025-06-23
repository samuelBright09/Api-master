import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiClientService } from './api-client.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey: string = 'mock-token';
  private router = inject(Router)
  private apiClientService = inject(ApiClientService)

   login(): void {
    // Simulate a token after login
    localStorage.setItem(this.tokenKey, 'mock-token-123');
    this.apiClientService.fetchPosts();
    this.router.navigate(['']);
  }

  logOut(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }


  getToken(): string{
    return localStorage.getItem(this.tokenKey) ?? '';
  }
}
