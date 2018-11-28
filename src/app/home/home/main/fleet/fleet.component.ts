import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { CarForUser } from 'src/models/carForUser';

@Component({
  selector: 'app-fleet',
  templateUrl: './fleet.component.html',
  styleUrls: ['./fleet.component.scss']
})
export class FleetComponent implements OnInit {
  wholeFleet: Array<CarForUser> = [];

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
    height: 620,
    responsive: {
      768: {
        items: 3
      }
    }
  };

  constructor(private carService: CarService) {}

  ngOnInit() {
    this.carService.getWholeFleetForUser().subscribe(
      (res: any) => {
        if (+res.status === 200) {
          this.wholeFleet = res.body;
        } else {
          console.log('Błąd podczas ładowania całej floty dla użytkownika');
        }
      },
      error => {
        console.log(error);
        console.log('Błąd podczas ładowania całej floty dla użytkownika');
        setTimeout(() => {
          this.ngOnInit();
        }, 300);
      }
    );
  }
}
