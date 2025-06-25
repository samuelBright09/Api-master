import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { FooterComponent } from "./components/footer/footer.component";
import { ButtonComponent } from "./components/button/button.component";
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FooterComponent, ButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
 private router = inject(Router)
 private authService = inject(AuthService)

 navigateToCreatePost() {
 this.router.navigateByUrl('create');
 }


 login(): void {
 this.authService.login();
 }

 logOut(): void {
 this.authService.logOut();
 } 
 
 isLoggedIn(): boolean {
  return this.authService.isAuthenticated();
 }
 



}
