import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {
  title = 'Upvaly';
  brandTitle = 'Upvaly';
  brandSubtitle = 'Level Up Daily';
  mobileMenuOpen = false;

  constructor(
    private router: Router
  ) {}

}
