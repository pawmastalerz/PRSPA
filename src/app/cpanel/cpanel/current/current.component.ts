import { OrderService } from 'src/services/order.service';
import { AlertifyService } from 'src/services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { OrderDetails } from 'src/models/OrderDetails';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss']
})
export class CurrentComponent implements OnInit {
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
    height: 620
  };

  currentlyOrdered: Array<OrderDetails> = [];

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
