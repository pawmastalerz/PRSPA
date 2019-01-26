import { Component, OnInit } from '@angular/core';
import { Car } from 'src/models/car';
import { CarService } from 'src/services/car.service';
import { AlertifyService } from 'src/services/alertify.service';

@Component({
  selector: 'app-fleet',
  templateUrl: './fleet.component.html',
  styleUrls: ['./fleet.component.scss']
})
export class FleetComponent implements OnInit {
  allCars: Array<Car> = [];

  constructor(
    private carService: CarService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.getAllCars();
  }

  getAllCars() {
    this.carService.getWholeFleet().subscribe(
      (res: any) => {
        if (+res.status === 200) {
          this.allCars = res.body;
        }
      },
      error => {
        console.log(error);
        this.alertify.message(
          'wystąpił błąd podczas pobierania wszystkich samochodów'
        );
      }
    );
  }
}
