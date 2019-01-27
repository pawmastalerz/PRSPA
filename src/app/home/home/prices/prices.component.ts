import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/services/car.service';
import { AlertifyService } from 'src/services/alertify.service';
import { Car } from 'src/models/car';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.scss']
})
export class PricesComponent implements OnInit {
  prices: Array<Car> = [];

  constructor(
    private carService: CarService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.getPrices();
  }

  getPrices() {
    this.carService.getWholeFleet().subscribe(
      (res: any) => {
        if (+res.status === 200) {
          this.prices = res.body;
        }
      },
      error => {
        console.log(error);
        this.alertify.message('błąd podczas pobierania floty z bazy danych');
      }
    );
  }
}
