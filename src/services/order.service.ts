import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl = environment.apiUrl;

  private reservedFrom = new BehaviorSubject<string>('');
  reservedFrom$ = this.reservedFrom.asObservable();

  private reservedTo = new BehaviorSubject<string>('');
  reservedTo$ = this.reservedTo.asObservable();

  private model = new BehaviorSubject<string>('');
  model$ = this.model.asObservable();

  private searchResult = new BehaviorSubject<Array<any>>(null);
  searchResult$ = this.searchResult.asObservable();

  constructor(private http: HttpClient) {}

  setReservedFrom(reservedFrom: string) {
    this.reservedFrom.next(reservedFrom);
  }

  setReservedTo(reservedTo: string) {
    this.reservedTo.next(reservedTo);
  }

  setModel(model: string) {
    this.model.next(model);
  }

  setSearchResult(searchResult: Array<any>) {
    this.searchResult.next(searchResult);
  }

  calculatePrice(reservedFrom: string, reservedTo: string, carId: number) {
    return this.http.post(
      this.baseUrl + 'orders/cprice',
      { reservedFrom, reservedTo, carId },
      {
        observe: 'response'
      }
    );
  }

  createOrder(
    reservedFrom: string,
    reservedTo: string,
    carId: number,
    userId: number
  ) {
    return this.http.put(
      this.baseUrl + 'orders/create',
      { reservedFrom, reservedTo, carId, userId },
      {
        observe: 'response'
      }
    );
  }

  getCurrentlyOrderedCars() {
    return this.http.get(this.baseUrl + 'orders/current', {
      observe: 'response'
    });
  }

  getOrderedHistory() {
    return this.http.get(this.baseUrl + 'orders/history', {
      observe: 'response'
    });
  }

  returnCar(orderId: number) {
    return this.http.post(this.baseUrl + 'orders/return/' + orderId, {
      observe: 'response'
    });
  }

  adminGetAllOrders() {
    return this.http.get(this.baseUrl + 'orders/admin/all', {
      observe: 'response'
    });
  }
}
