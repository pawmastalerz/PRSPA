import { OrderService } from 'src/services/order.service';
import { AlertifyService } from 'src/services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/models/Order';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss']
})
export class CurrentComponent implements OnInit {
  currentlyOrdered: Array<Order> = [];

  constructor(
    private orderService: OrderService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.getCurrentlyOrdered();
  }

  getCurrentlyOrdered() {
    this.orderService.getCurrentlyOrderedCars().subscribe(
      (res: any) => {
        if (+res.status === 200) {
          this.currentlyOrdered = res.body;
        }
      },
      error => {
        console.log(error);
        this.alertify.message(
          'wystąpił błąd podczaszwracania samochodu'
        );
      }
    );
  }
}
