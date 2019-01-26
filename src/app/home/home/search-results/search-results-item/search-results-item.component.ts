import { CalculatePriceParams } from 'src/models/CalculatePriceParams';
import { Router } from '@angular/router';
import { Car } from 'src/models/car';
import { AlertifyService } from 'src/services/alertify.service';
import { AuthService } from 'src/services/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from 'src/services/order.service';
import { Order } from 'src/models/Order';

@Component({
  selector: 'app-search-results-item',
  templateUrl: './search-results-item.component.html',
  styleUrls: ['./search-results-item.component.scss']
})
export class SearchResultsItemComponent implements OnInit {
  @Input()
  reservedFrom: string;
  @Input()
  reservedTo: string;
  @Input()
  searchResult: Car;

  isAuth: boolean;
  calculatePriceParams: CalculatePriceParams = new CalculatePriceParams();
  calculatedPrice: number;

  newOrder: Order = new Order();

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.isAuth$.subscribe(isAuth => (this.isAuth = isAuth));
    this.calculatePrice();
  }

  calculatePrice() {
    this.calculatePriceParams.reservedFrom = this.reservedFrom;
    this.calculatePriceParams.reservedTo = this.reservedTo;
    this.calculatePriceParams.carId = this.searchResult['carId'];

    this.orderService.calculatePrice(this.calculatePriceParams).subscribe(
      (res: any) => {
        if (+res.status === 200) {
          this.calculatedPrice = res.body;
        }
      },
      error => {
        console.log(error);
        this.alertify.message('błąd podczas obliczania kwoty zamówienia');
      }
    );
  }

  onOrder() {
    this.newOrder.reservedFrom = this.reservedFrom;
    this.newOrder.reservedTo = this.reservedTo;
    this.newOrder.carId = this.searchResult['carId'];
    this.newOrder.userId = this.authService.getUserId();

    this.orderService.createOrder(this.newOrder).subscribe(
      (res: any) => {
        if (+res.status === 200) {
          this.alertify.message('dokonano wyboru');
          setTimeout(() => {
            this.alertify.message('przekierowuję na stronę płatności...');
          }, 1500);
          setTimeout(() => {
            this.router.navigate(['home/cpanel/current']);
            this.alertify.message('zamówiono poprawnie');
          }, 4000);
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
        } else if (error.error === 'Requested car is unavaliable') {
          return this.alertify.message(
            'samochód jest już niedostępny w tym terminie'
          );
        }
        this.alertify.message('błąd podczas składania zamówienia');
      }
    );
  }
}
