import { Router } from '@angular/router';
import { CarService } from 'src/services/car.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CarForUser } from 'src/models/carForUser';
import { AlertifyService } from 'src/services/alertify.service';
import { NewOrderService } from 'src/services/new-order.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  wholeFleet: Array<CarForUser> = [];
  fleetWithDistinctModels: Array<CarForUser> = [];

  reservedFrom: string;
  reservedTo: string;
  model: string;
  searchResult: Array<any>;

  searchForm = new FormGroup({
    reservedFrom: new FormControl('', Validators.required),
    reservedTo: new FormControl('', Validators.required),
    model: new FormControl('', Validators.required)
  });

  constructor(
    private carService: CarService,
    private alertify: AlertifyService,
    private newOrder: NewOrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.newOrder.reservedFrom$.subscribe(
      reservedFrom => (this.reservedFrom = reservedFrom)
    );
    this.newOrder.reservedTo$.subscribe(
      reservedTo => (this.reservedTo = reservedTo)
    );
    this.newOrder.model$.subscribe(model => (this.model = model));
    this.newOrder.searchResult$.subscribe(
      searchResult => (this.searchResult = searchResult)
    );

    this.carService.getWholeFleetForUser().subscribe(
      (res: any) => {
        if (+res.status === 200) {
          this.wholeFleet = res.body;
        }
      },
      error => {
        console.log(error);
        setTimeout(() => {
          this.ngOnInit();
        }, 300);
      }
    );

    this.carService.getAllCarModels().subscribe(
      (res: any) => {
        if (+res.status === 200) {
          this.fleetWithDistinctModels = res.body;
        }
      },
      error => {
        console.log(error);
        this.alertify.message('błąd podczas pobierania modeli z bazy danych');
      }
    );
  }

  onSearch() {
    if (this.searchForm.value.reservedFrom > this.searchForm.value.reservedTo) {
      this.alertify.message(
        'data wypożyczenia nie może być większa, niż data zwrotu'
      );
    } else {
      this.carService
        .searchForAvaliableCars(
          this.searchForm.value.model,
          this.searchForm.value.reservedFrom,
          this.searchForm.value.reservedTo
        )
        .subscribe(
          (res: any) => {
            if (+res.status === 200) {
              if (res.body.length === 0) {
                this.alertify.message(
                  'model ' +
                    this.searchForm.value.model +
                    ' nie jest dostępny w tym terminie'
                );
              } else if (res.body.length > 0) {
                this.newOrder.setReservedFrom(
                  this.searchForm.value.reservedFrom
                );
                this.newOrder.setReservedTo(this.searchForm.value.reservedTo);
                this.newOrder.setModel(this.searchForm.value.model);
                this.newOrder.setSearchResult(res.body);
                this.router.navigate(['home/search_results']);
              }
            }
          },
          error => {
            console.log(error);
            if (
              error.error === 'Reservation\'s date is lower than current time'
            ) {
              return this.alertify.message(
                'nie można złożyć zamówienia z datą wsteczną'
              );
            } else if (
              error.error === 'Reservation\'s date is bigger than 6 months'
            ) {
              return this.alertify.message(
                'maksymalne wyprzedzenie zamówienia to pół roku'
              );
            }
            this.alertify.message('nieprawidłowe dane wyszukiwania');
          }
        );
    }
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.onSearch();
    }
  }
}
