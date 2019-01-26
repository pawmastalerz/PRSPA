import { AlertifyService } from './alertify.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuth = new BehaviorSubject<boolean>(false);
  isAuth$ = this.isAuth.asObservable();
  private isAdmin = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.isAdmin.asObservable();

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
          if (+res.status === 200) {
            localStorage.setItem('accessToken', res.body.token);
            this.decodedToken = this.jwtHelper.decodeToken(res.body.token);
            if (this.isAuthenticated()) {
              this.isAuth.next(true);
              if (this.isAuthenticatedAsAdmin()) {
                this.isAdmin.next(true);
              }
              this.router.navigateByUrl('/home/main');
              this.alertify.message('witaj, ' + username + '!');
            }
          }
        },
        error => {
          console.log(error);
          if (+error.status === 401) {
            this.alertify.message('nieprawidłowe dane logowania');
          }
        }
      );
  }

  logout() {
    localStorage.removeItem('accessToken');
    this.isAuth.next(false);
    this.isAdmin.next(false);
  }

  register(user: User) {
    return this.http
      .post(this.baseUrl + 'users/register', user, {
        observe: 'response'
      })
      .subscribe(
        (res: any) => {
          if (+res.status === 200) {
            this.router.navigateByUrl('/home/login');
            this.alertify.message(
              'zarejestrowano użytkownika ' + user.username
            );
          }
        },
        error => {
          console.log(error);
          if (error.error.message === 'This username is already taken') {
            return this.alertify.message('podany login już istnieje');
          }
          this.alertify.message('błąd podczas rejestracji użytkownika');
        }
      );
  }

  getSpecificPersonalData(userId: string) {
    return this.http.get(this.baseUrl + 'users/' + userId, {
      observe: 'response'
    });
  }

  getPersonalData() {
    const decodedTokenId = this.decodedToken['unique_name'];
    return this.http.get(this.baseUrl + 'users/' + decodedTokenId, {
      observe: 'response'
    });
  }

  getUserId() {
    const decodedTokenId = this.decodedToken['unique_name'];
    return decodedTokenId;
  }

  updatePersonal(user: User) {
    const decodedTokenId = this.decodedToken['unique_name'];
    return this.http.put(this.baseUrl + 'users/' + decodedTokenId, user, {
      observe: 'response'
    });
  }

  updatePassword(currentPassword: string, password: string) {
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
    const decodedTokenId = this.decodedToken['unique_name'];
    return this.http.delete(this.baseUrl + 'users/' + decodedTokenId, {
      observe: 'response'
    });
  }

  deleteSpecificAccount(userId: number) {
    return this.http.delete(this.baseUrl + 'users/' + userId, {
      observe: 'response'
    });
  }

  setIsAuth(isAuth: boolean) {
    this.isAuth.next(isAuth);
  }

  setIsAdmin(isAdmin: boolean) {
    this.isAdmin.next(isAdmin);
  }

  public isAuthenticated(): boolean {
    if (
      localStorage.getItem('accessToken') === null ||
      this.jwtHelper.isTokenExpired(this.getToken())
    ) {
      return false;
    }
    this.decodedToken = this.jwtHelper.decodeToken(this.getToken());
    return true;
  }

  public isAuthenticatedAsAdmin(): boolean {
    if (
      localStorage.getItem('accessToken') === null ||
      this.jwtHelper.isTokenExpired(this.getToken()) ||
      this.decodedToken.unique_name !== '1'
    ) {
      return false;
    }
    return true;
  }

  getToken() {
    return localStorage.getItem('accessToken');
  }

  adminGetAllUsers() {
    return this.http.get(this.baseUrl + 'users/admin/all', {
      observe: 'response'
    });
  }
}
