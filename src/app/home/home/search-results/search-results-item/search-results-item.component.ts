import { CarForUser } from 'src/models/carForUser';
import { AlertifyService } from 'src/services/alertify.service';
import { AuthService } from 'src/services/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { NewOrderService } from 'src/services/new-order.service';

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
  searchResult: Array<CarForUser>;

  isAuth: boolean;
  calculatedPrice: number;

  constructor(
    private authService: AuthService,
    private newOrder: NewOrderService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.authService.isAuth$.subscribe(isAuth => (this.isAuth = isAuth));
    this.calculatePrice();
  }

  calculatePrice() {
    this.newOrder.calculatePrice(this.reservedFrom, this.reservedTo, this.searchResult['id']).subscribe(
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
}
