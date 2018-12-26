import { AlertifyService } from 'src/services/alertify.service';
import { CarForUser } from 'src/models/carForUser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from 'src/services/car.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {
  carDetails: CarForUser;

  constructor(
    private carService: CarService,
    private route: ActivatedRoute,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.carService
      .getCarDetailsForUser(this.route.snapshot.params['id'])
      .subscribe(
        (res: any) => {
          if (+res.status === 200) {
            this.carDetails = res.body;
          }
        },
        error => {
          console.log(error);
          this.alertify.message('błąd podczas ładowania szczegółów samochodu');
        }
      );
  }
}
