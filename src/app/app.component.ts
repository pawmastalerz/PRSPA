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

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.isAuth$.subscribe(isAuth => (this.isAuth = isAuth));
    if (this.authService.isAuthenticated()) {
      this.authService.setIsAuth(true);
    }
  }
}
