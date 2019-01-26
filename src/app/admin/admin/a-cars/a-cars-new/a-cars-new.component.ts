import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertifyService } from 'src/services/alertify.service';
import { CarService } from 'src/services/car.service';
import { Router } from '@angular/router';

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

  newCarFormData: FormData;

  constructor(
    private carService: CarService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {}

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.onSubmit();
    }
  }

  onSelectCarPhotoFile(event) {
    if (event.target.files.length === 0) {
      return;
    }

    for (const file of event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      this.newCarFormData = new FormData();
      this.newCarFormData.append(file.name, file);
    }
  }

  onSubmit() {
    if (this.newCarForm.valid) {
      this.alertify.message('dodaję nowy samochód...');

      this.newCarFormData.set('brand', this.newCarForm.value.brand);
      this.newCarFormData.set('model', this.newCarForm.value.model);
      this.newCarFormData.set('body', this.newCarForm.value.body);
      this.newCarFormData.set('description', this.newCarForm.value.description);
      this.newCarFormData.set('doors', this.newCarForm.value.doors);
      this.newCarFormData.set('fuel', this.newCarForm.value.fuel);
      this.newCarFormData.set(
        'transmission',
        this.newCarForm.value.transmission
      );
      this.newCarFormData.set('price', this.newCarForm.value.price);
      this.newCarFormData.set('year', this.newCarForm.value.year);
      this.newCarFormData.set('lP100Km', this.newCarForm.value.lP100Km);
      this.newCarFormData.set(
        'airConditioned',
        this.newCarForm.value.airConditioned
      );

      this.carService.createCar(this.newCarFormData).subscribe(
        (res: any) => {
          if (+res.status === 200) {
            this.alertify.message('dodano nowy samochód do bazy danych');
            this.newCarForm.reset();
            this.newCarFormData = new FormData();
            this.router.navigate(['home/admin/orders']);
            setTimeout(() => {
              this.router.navigate(['home/admin/cars']);
            }, 10);
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
