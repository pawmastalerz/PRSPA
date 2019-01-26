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
  wholeFleet: Array<Car> = [];

  mySlideOptions = {
    items: 1,
    loop: true,
    rewind: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    autoplaySpeed: 2000,
    dots: false,
    nav: false,
    margin: 70,
    height: 620,
    responsive: {
      992: {
        items: 3
      }
    }
  };

  constructor(
    private carService: CarService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.carService.getWholeFleet().subscribe(
      (res: any) => {
        if (+res.status === 200) {
          this.wholeFleet = res.body;
        }
      },
      error => {
        console.log(error);
        this.alertify.message(
          'Błąd podczas ładowania całej floty dla użytkownika'
        );
      }
    );
  }
}
