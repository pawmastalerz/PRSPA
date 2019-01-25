import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertifyService } from 'src/services/alertify.service';
import { CarService } from 'src/services/car.service';

@Component({
  selector: 'app-a-cars-new',
  templateUrl: './a-cars-new.component.html',
  styleUrls: ['./a-cars-new.component.scss']
})
export class ACarsNewComponent implements OnInit {
  newCarForm = new FormGroup({
    brand: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    model: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    body: new FormControl('', [Validators.required]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(200)
    ]),
    doors: new FormControl('', [Validators.required]),
    fuel: new FormControl('', [Validators.required]),
    transmission: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    year: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(4)
    ]),
    lP100Km: new FormControl('', [Validators.required]),
    airConditioned: new FormControl('', [Validators.required]),
    photoFile: new FormControl('', [Validators.required])
  });

  constructor(
    private carService: CarService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {}

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.onSubmit();
    }
  }

  onSubmit() {
    if (this.newCarForm.valid) {
      console.log(this.newCarForm.value);
      this.carService.createCar(this.newCarForm.value).subscribe(
        (res: any) => {
          if (+res.status === 200) {
            this.alertify.message('dodano nowy samochód do bazy danych');
          }
        },
        error => {
          console.log(error);
          this.alertify.message(
            'błąd podczas dodawania samochodu do bazy danych'
          );
        }
      );
    } else {
      if (this.newCarForm.controls.brand.status === 'INVALID') {
        this.alertify.message('marka musi zawierać od 3 do 30 znaków');
        return;
      } else if (this.newCarForm.controls.model.status === 'INVALID') {
        this.alertify.message('model musi zawierać od 3 do 30 znaków');
        return;
      } else if (this.newCarForm.controls.body.status === 'INVALID') {
        this.alertify.message('podaj typ nadwozia');
        return;
      } else if (this.newCarForm.controls.description.status === 'INVALID') {
        this.alertify.message('opis musi zawierać od 3 do 200 znaków');
        return;
      } else if (this.newCarForm.controls.doors.status === 'INVALID') {
        this.alertify.message('podaj liczbę drzwi');
        return;
      } else if (this.newCarForm.controls.fuel.status === 'INVALID') {
        this.alertify.message('podaj rodzaj paliwa');
        return;
      } else if (this.newCarForm.controls.transmission.status === 'INVALID') {
        this.alertify.message('podaj rodzaj skrzyni biegów');
        return;
      } else if (this.newCarForm.controls.price.status === 'INVALID') {
        this.alertify.message('podaj cenę za dzień wypożyczenia');
        return;
      } else if (this.newCarForm.controls.year.status === 'INVALID') {
        this.alertify.message('podaj rocznik');
        return;
      } else if (this.newCarForm.controls.lP100Km.status === 'INVALID') {
        this.alertify.message('podaj średnie spalanie na 100 km');
        return;
      } else if (this.newCarForm.controls.airConditioned.status === 'INVALID') {
        this.alertify.message('podaj, czy samochód jest klimatyzowany');
        return;
      } else if (this.newCarForm.controls.photoFile.status === 'INVALID') {
        this.alertify.message('wybierz zdjęcie pojazdu');
        return;
      }
    }
  }
}
