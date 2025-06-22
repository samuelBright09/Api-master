import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { FooterComponent } from "./components/footer/footer.component";
import { ButtonComponent } from "./components/button/button.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, ButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
 private router = inject(Router)

 navigateToCreatePost() {
 this.router.navigateByUrl('create');
 }
}
