import { Component, OnInit, Input } from '@angular/core';
import { OrderDetails } from 'src/models/OrderDetails';
import { OrderService } from 'src/services/order.service';
import { AlertifyService } from 'src/services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history-item',
  templateUrl: './history-item.component.html',
  styleUrls: ['./history-item.component.scss']
})
export class HistoryItemComponent implements OnInit {
  @Input()
  orderDetails: OrderDetails;

  constructor() {}

  ngOnInit() {}
}
