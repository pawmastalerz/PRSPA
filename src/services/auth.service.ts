import { AlertifyService } from './alertify.service';
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

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  login(username: string, password: string) {
    return this.http
      .post(
        this.baseUrl + 'users/login',
        { username, password },
        {
          observe: 'response'
        }
      )
      .subscribe(
        (res: any) => {
          console.log(+res.status);
          if (+res.status === 200) {
            localStorage.setItem('accessToken', res.body.token);
            this.decodedToken = this.jwtHelper.decodeToken(res.body.token);
            if (this.isAuthenticated) {
              this.isAuth.next(true);
              this.router.navigateByUrl('/home/main');
              this.alertify.message('zalogowano jako ' + username);
            }
          }
        },
        error => {
          console.log(+error.status);
          if (+error.status === 401) {
            this.alertify.message('nieprawidłowe dane logowania');
          }
        }
      );
  }

  logout() {
    localStorage.removeItem('accessToken');
    this.isAuth.next(false);
  }

  register(
    username: string,
    email: string,
    password: string,
    city: string,
    street: string,
    streetNumber: string,
    postalCode: string
  ) {
    return this.http
      .post(
        this.baseUrl + 'users/register',
        { username, email, password, city, street, streetNumber, postalCode },
        {
          observe: 'response'
        }
      )
      .subscribe(
        (res: any) => {
          if (+res.status === 200) {
            this.router.navigateByUrl('/home/login');
            this.alertify.message('zarejestrowano użytkownika ' + username);
          }
        },
        error => {
          console.log(error);
          this.alertify.message('nieprawidłowe dane rejestracyjne');
        }
      );
  }

  getPersonalData() {
    this.decodedToken = this.jwtHelper.decodeToken(
      localStorage.getItem('accessToken')
    );
    const decodedTokenId = this.decodedToken['unique_name'];
    return this.http.get(this.baseUrl + 'users/' + decodedTokenId, {
      observe: 'response'
    });
  }

  updatePersonal(
    username: string,
    email: string,
    city: string,
    street: string,
    streetNumber: string,
    postalCode: string
  ) {
    this.decodedToken = this.jwtHelper.decodeToken(
      localStorage.getItem('accessToken')
    );
    const decodedTokenId = this.decodedToken['unique_name'];
    return this.http.put(
      this.baseUrl + 'users/' + decodedTokenId,
      { username, email, city, street, streetNumber, postalCode },
      {
        observe: 'response'
      }
    );
  }

  updatePassword(currentPassword: string, password: string) {
    this.decodedToken = this.jwtHelper.decodeToken(
      localStorage.getItem('accessToken')
    );
    const decodedTokenId = this.decodedToken['unique_name'];
    return this.http.put(
      this.baseUrl + 'users/' + decodedTokenId,
      { currentPassword, password },
      {
        observe: 'response'
      }
    );
  }

  deleteAccount() {
    this.decodedToken = this.jwtHelper.decodeToken(
      localStorage.getItem('accessToken')
    );
    const decodedTokenId = this.decodedToken['unique_name'];
    return this.http.delete(this.baseUrl + 'users/' + decodedTokenId, {
      observe: 'response'
    });
  }

  setIsAuth(isAuth: boolean) {
    this.isAuth.next(isAuth);
    // console.log('Obecna wartosc isAuth: ' + this.isAuth.value);
  }

  public isAuthenticated(): boolean {
    if (!this.jwtHelper.isTokenExpired(localStorage.getItem('accessToken'))) {
      this.isAuth.next(true);
      return true;
    }
    return false;
  }

  getToken() {
    return localStorage.getItem('accessToken');
  }
}
