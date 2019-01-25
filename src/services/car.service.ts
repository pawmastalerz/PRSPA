import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Car } from 'src/models/car';
import { SearchParams } from 'src/models/searchParams';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createCar(carToCreate: FormData) {
    return this.http.post(this.baseUrl + 'cars/create', carToCreate, {
      observe: 'response'
    });
  }

  getWholeFleet() {
    return this.http.get(this.baseUrl + 'cars/all', {
      observe: 'response'
    });
  }

  getUniqueModels() {
    return this.http.get(this.baseUrl + 'cars/all', {
      observe: 'response'
    });
  }

  getCarDetails(carId: string) {
    return this.http.get(this.baseUrl + 'cars/' + carId, {
      observe: 'response'
    });
  }

  getAllCarModels() {
    return this.http.get(this.baseUrl + 'cars/models', {
      observe: 'response'
    });
  }

  searchForAvaliableCars(searchParams: SearchParams) {
    return this.http.post(
      this.baseUrl + 'cars/search',
      searchParams,
      {
        observe: 'response'
      }
    );
  }
}
