import { Component, OnInit } from '@angular/core';
import { OrderDetails } from 'src/models/OrderDetails';
import { OrderService } from 'src/services/order.service';
import { AlertifyService } from 'src/services/alertify.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  orderedHistory: Array<OrderDetails> = [];

  constructor(
    private orderService: OrderService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.getOrderedDetails();
  }

  getOrderedDetails() {
    this.orderService.getOrderedHistory().subscribe(
      (res: any) => {
        if (+res.status === 200) {
          this.orderedHistory = res.body;
        }
      },
      error => {
        console.log(error);
        this.alertify.message(
          'wystąpił błąd podczas pobierania historii zamówień'
        );
      }
    );
  }

}
