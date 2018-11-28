import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getWholeFleetForUser() {
    return this.http.get(this.baseUrl + 'cars/user/all', {
      observe: 'response'
    });
  }
}
