import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/services/car.service';
import { AlertifyService } from 'src/services/alertify.service';
import { OrderService } from 'src/services/order.service';
import { Car } from 'src/models/car';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-neworder',
  templateUrl: './neworder.component.html',
  styleUrls: ['./neworder.component.scss']
})
export class NeworderComponent implements OnInit {
  wholeFleet: Array<Car> = [];
  fleetWithDistinctModels: Array<Car> = [];

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
    private newOrder: OrderService,
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

    this.carService.getWholeFleet().subscribe(
      (res: any) => {
        if (+res.status === 200) {
          this.wholeFleet = res.body;
        }
      },
      error => {
        console.log(error);
        this.alertify.message('błąd podczas pobierania floty z bazy danych');
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
      this.carService.searchForAvaliableCars(this.searchForm.value).subscribe(
        (res: any) => {
          if (+res.status === 200) {
            if (res.body.length === 0) {
              this.alertify.message(
                'model ' +
                  this.searchForm.value.model +
                  ' nie jest dostępny w tym terminie'
              );
            } else if (res.body.length > 0) {
              this.newOrder.setReservedFrom(this.searchForm.value.reservedFrom);
              this.newOrder.setReservedTo(this.searchForm.value.reservedTo);
              this.newOrder.setModel(this.searchForm.value.model);
              this.newOrder.setSearchResult(res.body);
              this.router.navigate(['home/search_results']);
            }
          }
        },
        error => {
          console.log(error);
          if (error.error === 'Reservation\'s date is lower than current time') {
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
