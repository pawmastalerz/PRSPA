import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  getWholeFleetForUser() {
    return this.http.get(this.baseUrl + 'cars/user/all', {
      observe: 'response'
    });
  }

  getUniqueModels() {
    return this.http.get(this.baseUrl + 'cars/user/all', {
      observe: 'response'
    });
  }

  getCarDetailsForUser(id: string) {
    return this.http.get(this.baseUrl + 'cars/user/' + id, {
      observe: 'response'
    });
  }

  searchForAvaliableCars(model: string, reservedFrom: Date, reservedTo: Date) {
    return this.http
      .post(
        this.baseUrl + 'cars/user/search',
        { model, reservedFrom, reservedTo },
        {
          observe: 'response'
        }
      )
      .subscribe(
        (res: any) => {
          if (+res.status === 200) {
            console.log(res.body.length);
          }
        },
        error => {
          console.log(error);
          this.alertify.message('nieprawidłowe dane wyszukiwania');
        }
      );
  }
}
