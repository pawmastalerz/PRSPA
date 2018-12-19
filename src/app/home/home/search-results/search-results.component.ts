import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NewOrderService } from 'src/services/new-order.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CarService } from 'src/services/car.service';
import { AlertifyService } from 'src/services/alertify.service';
import { CarForUser } from 'src/models/carForUser';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  fleetWithDistinctModels: Array<CarForUser> = [];

  reservedFrom: string;
  reservedTo: string;
  model: string;
  searchResult: Array<any> = [1];

  searchForm = new FormGroup({
    reservedFrom: new FormControl(this.reservedFrom, Validators.required),
    reservedTo: new FormControl(this.reservedTo, Validators.required),
    model: new FormControl(this.model, Validators.required)
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

    this.searchForm.patchValue({ reservedFrom: this.reservedFrom });
    this.searchForm.patchValue({ reservedTo: this.reservedTo });
    this.searchForm.patchValue({ model: this.model });

    if (this.searchResult === null) {
      // this.router.navigate(['home/main']);
    }

    this.getAllCarModels();
  }

  onUpdate() {
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
                this.getAllCarModels();
                this.newOrder.setSearchResult(res.body);
              }
            }
            console.log(this.searchResult);
            console.log(this.searchResult[0].brand);
          },
          error => {
            console.log(error);
            this.alertify.message('nieprawidłowe dane wyszukiwania');
          }
        );
    }
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.onUpdate();
    }
  }

  getAllCarModels() {
    this.carService.getAllCarModels().subscribe(
      (res: any) => {
        if (+res.status === 200) {
          const copiedBody: Array<any> = res.body;
          const indexOfDuplicate = copiedBody.findIndex(
            x => x.model === this.model
          );
          if (indexOfDuplicate !== -1) {
            copiedBody.splice(indexOfDuplicate, 1);
          }
          this.fleetWithDistinctModels = res.body;
        }
      },
      error => {
        console.log(error);
        this.alertify.message('błąd podczas pobierania modeli z bazy danych');
      }
    );
  }
}
