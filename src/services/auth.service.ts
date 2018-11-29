import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuth = new BehaviorSubject<boolean>(false);
  isAuth$ = this.isAuth.asObservable();

  baseUrl = environment.apiUrl;
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    return this.http
      .post(
        this.baseUrl + 'users/login',
        { username, password },
        {
          observe: 'response'
        }
      )
      .subscribe((res: any) => {
        if (+res.status === 200) {
          localStorage.setItem('accessToken', res.body.token);
          this.decodedToken = this.jwtHelper.decodeToken(res.body.token);
          if (this.isAuthenticated) {
            this.isAuth.next(true);
            this.router.navigateByUrl('/home/main');
          } else {
            this.logout();
          }
        } else {
          this.logout();
          console.log('Nieprawidłowe hasło');
        }
      });
  }

  logout() {
    localStorage.removeItem('accessToken');
  }

  public isAuthenticated(): boolean {
    if (!this.jwtHelper.isTokenExpired(localStorage.getItem('accessToken'))) {
      this.isAuth.next(true);
      return true;
    }
    this.logout();
    return false;
  }
}
