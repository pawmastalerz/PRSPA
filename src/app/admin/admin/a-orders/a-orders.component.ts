import { OrderService } from 'src/services/order.service';
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/services/alertify.service';
import { OrderDetails } from 'src/models/OrderDetails';

@Component({
  selector: 'app-a-orders',
  templateUrl: './a-orders.component.html',
  styleUrls: ['./a-orders.component.scss']
})
export class AOrdersComponent implements OnInit {
  allOrders: Array<OrderDetails> = [];

  constructor(
    private orderService: OrderService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.getAllOrders();
  }

  getAllOrders() {
    this.orderService.adminGetAllOrders().subscribe(
      (res: any) => {
        if (+res.status === 200) {
          this.allOrders = res.body;
          console.log(this.allOrders);
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
}
