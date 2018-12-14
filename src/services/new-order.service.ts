import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewOrderService {
  private reservedFrom = new BehaviorSubject<string>('');
  reservedFrom$ = this.reservedFrom.asObservable();

  private reservedTo = new BehaviorSubject<string>('');
  reservedTo$ = this.reservedTo.asObservable();

  private model = new BehaviorSubject<string>('');
  model$ = this.model.asObservable();

  private searchResult = new BehaviorSubject<Array<any>>(null);
  searchResult$ = this.searchResult.asObservable();

  constructor() {}

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
}
