import { CarForUser } from 'src/models/carForUser';
import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {
  carDetails: CarForUser;

  constructor(private carService: CarService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.carService.getCarDetailsForUser(this.route.snapshot.params['id']).subscribe(
      (res: any) => {
        if (+res.status === 200) {
          this.carDetails = res.body;
          console.log(this.carDetails);
        } else {
          console.log('Błąd podczas ładowania szczegółów samochodu dla użytkownika');
        }
      },
      error => {
        console.log(error);
        console.log('Błąd podczas ładowania szczegółów samochodu dla użytkownika');
        setTimeout(() => {
          this.ngOnInit();
        }, 300);
      }
    );
  }
}
