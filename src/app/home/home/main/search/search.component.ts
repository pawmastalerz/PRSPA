import { CarService } from 'src/services/car.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CarForUser } from 'src/models/carForUser';
import { AlertifyService } from 'src/services/alertify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  wholeFleet: Array<CarForUser> = [];

  searchForm = new FormGroup({
    model: new FormControl('', Validators.required),
    reservedFrom: new FormControl('', Validators.required),
    reservedTo: new FormControl('', Validators.required)
  });

  constructor(
    private carService: CarService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.carService.getWholeFleetForUser().subscribe(
      (res: any) => {
        if (+res.status === 200) {
          this.wholeFleet = res.body;
        } else {
          console.log('Błąd podczas ładowania całej floty dla użytkownika');
        }
      },
      error => {
        console.log(error);
        console.log('Błąd podczas ładowania całej floty dla użytkownika');
        setTimeout(() => {
          this.ngOnInit();
        }, 300);
      }
    );
  }

  onSearch() {
    if (this.searchForm.value.reservedFrom > this.searchForm.value.reservedTo) {
      this.alertify.message(
        'Data wypożyczenia nie może być większa, niż data zwrotu'
      );
    } else {
      this.carService.searchForAvaliableCars(
        this.searchForm.value.model,
        this.searchForm.value.reservedFrom,
        this.searchForm.value.reservedTo
      );
    }
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.onSearch();
    }
  }
}
