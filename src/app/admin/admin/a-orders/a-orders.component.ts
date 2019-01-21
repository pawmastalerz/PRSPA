import { OrderService } from 'src/services/order.service';
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/services/alertify.service';
import { Order } from 'src/models/Order';

@Component({
  selector: 'app-a-orders',
  templateUrl: './a-orders.component.html',
  styleUrls: ['./a-orders.component.scss']
})
export class AOrdersComponent implements OnInit {
  allOrders: Array<Order> = [];
  allCurrentOrders: Array<Order> = [];

  constructor(
    private orderService: OrderService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.getAllOrders();
    this.getAllCurrentOrders();
  }

  getAllOrders() {
    this.orderService.adminGetAllOrders().subscribe(
      (res: any) => {
        if (+res.status === 200) {
          this.allOrders = res.body;
        }
      },
      error => {
        console.log(error);
        this.alertify.message(
          'wystąpił błąd podczas pobierania wszystkich zamówień'
        );
      }
    );
  }

  getAllCurrentOrders() {
    this.orderService.adminGetAllCurrentOrders().subscribe(
      (res: any) => {
        if (+res.status === 200) {
          this.allCurrentOrders = res.body;
        }
      },
      error => {
        console.log(error);
        this.alertify.message(
          'wystąpił błąd podczas pobierania wszystkich aktualnych zamówień'
        );
      }
    );
  }
}
