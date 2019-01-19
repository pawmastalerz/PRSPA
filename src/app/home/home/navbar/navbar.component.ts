import { AlertifyService } from 'src/services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isAuth: boolean;
  isAdmin: boolean;

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.authService.isAuth$.subscribe(isAuth => (this.isAuth = isAuth));
    this.authService.isAdmin$.subscribe(isAdmin => (this.isAdmin = isAdmin));
  }

  logout() {
    this.authService.logout();
    this.alertify.message('wylogowano');
  }

  onScroll(event) {
    window.scroll(0, 0);
  }
}
