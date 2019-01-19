import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'PRSPA';
  isAuth: boolean;
  isAdmin: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.isAuth$.subscribe(isAuth => (this.isAuth = isAuth));
    this.authService.isAdmin$.subscribe(isAdmin => (this.isAdmin = isAdmin));
    if (this.authService.isAuthenticated()) {
      this.authService.setIsAuth(true);
    }
    if (this.authService.isAuthenticatedAsAdmin()) {
      this.authService.setIsAdmin(true);
    }
  }

  onActivate(event) {
    window.scroll(0, 0);
  }
}
