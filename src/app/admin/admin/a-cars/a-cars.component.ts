import { CarService } from 'src/services/car.service';
import { Component, OnInit } from '@angular/core';
import { Car } from 'src/models/car';
import { AlertifyService } from 'src/services/alertify.service';

@Component({
  selector: 'app-a-cars',
  templateUrl: './a-cars.component.html',
  styleUrls: ['./a-cars.component.scss']
})
export class ACarsComponent implements OnInit {
  wholeFleet: Array<Car> = [];

  constructor(
    private carService: CarService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.getWholeFleet();
  }

  getWholeFleet() {
    this.carService.getWholeFleet().subscribe(
      (res: any) => {
        if (+res.status === 200) {
          this.wholeFleet = res.body;
        }
      },
      error => {
        console.log(error);
        this.alertify.message(
          'wystąpił błąd podczas pobierania całej floty'
        );
      }
    );
  }

}
