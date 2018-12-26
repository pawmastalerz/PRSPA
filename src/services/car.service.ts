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

  getUniqueModels() {
    return this.http.get(this.baseUrl + 'cars/user/all', {
      observe: 'response'
    });
  }

  getCarDetailsForUser(carId: string) {
    return this.http.get(this.baseUrl + 'cars/user/' + carId, {
      observe: 'response'
    });
  }

  getAllCarModels() {
    return this.http.get(this.baseUrl + 'cars/models', {
      observe: 'response'
    });
  }

  searchForAvaliableCars(model: string, reservedFrom: Date, reservedTo: Date) {
    return this.http.post(
      this.baseUrl + 'cars/user/search',
      { model, reservedFrom, reservedTo },
      {
        observe: 'response'
      }
    );
  }
}
