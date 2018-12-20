import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewOrderService {
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

  calculatePrice(reservedFrom: string, reservedTo: string, id: number) {
    return this.http.put(
      this.baseUrl + 'orders/calculate_price',
      { reservedFrom, reservedTo, id },
      {
        observe: 'response'
      }
    );
  }
}
