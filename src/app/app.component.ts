import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
 private router = inject(Router)

 navigateToCreatePost() {
 this.router.navigateByUrl('create');
 }
}
