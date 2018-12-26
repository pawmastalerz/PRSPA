import { Router } from '@angular/router';
import { OrderDetails } from 'src/models/OrderDetails';
import { AlertifyService } from 'src/services/alertify.service';
import { OrderService } from 'src/services/order.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-current-item',
  templateUrl: './current-item.component.html',
  styleUrls: ['./current-item.component.scss']
})
export class CurrentItemComponent implements OnInit {
  @Input()
  orderDetails: OrderDetails;

  constructor(
    private orderService: OrderService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  onReturn() {
    this.orderService.returnCar(this.orderDetails.orderId).subscribe(
      () => {
        this.alertify.message('zwrócono poprawnie');
        this.router.navigate(['home/cpanel/history']);
      },
      error => {
        console.log(error);
        this.alertify.message(
          'wystąpił błąd podczas pobierania aktualnie wypożyczonych samochodów'
        );
      }
    );
  }
}
