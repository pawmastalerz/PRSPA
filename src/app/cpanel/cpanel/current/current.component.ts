import { NewOrderService } from 'src/services/new-order.service';
import { AlertifyService } from 'src/services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { CarForUser } from 'src/models/carForUser';
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
    private newOrderService: NewOrderService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.getCurrentlyOrdered();
  }

  getCurrentlyOrdered() {
    this.newOrderService.getCurrentlyOrderedCars().subscribe(
      (res: any) => {
        if (+res.status === 200) {
          this.currentlyOrdered = res.body;
        }
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
