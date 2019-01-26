import { Component, OnInit } from '@angular/core';
import { Car } from 'src/models/car';
import { CarService } from 'src/services/car.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/services/alertify.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-a-car-details',
  templateUrl: './a-car-details.component.html',
  styleUrls: ['./a-car-details.component.scss']
})
export class ACarDetailsComponent implements OnInit {
  carDetails: Car = new Car();
  idByRoute = this.route.snapshot.params['id'];

  editCarForm = new FormGroup({
    carId: new FormControl('', null),
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
    photoFile: new FormControl('', null)
  });

  editCarFormData: FormData = new FormData();

  constructor(
    private carService: CarService,
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCarData();
  }

  getCarData() {
    this.carService.getCarDetails(this.idByRoute).subscribe(
      (res: any) => {
        if (+res.status === 200) {
          this.carDetails = res.body;
          this.editCarForm.patchValue({
            carId: this.carDetails.carId,
            brand: this.carDetails.brand,
            model: this.carDetails.model,
            body: this.carDetails.body,
            description: this.carDetails.description,
            doors: this.carDetails.doors,
            fuel: this.carDetails.fuel,
            transmission: this.carDetails.transmission,
            price: this.carDetails.price,
            year: this.carDetails.year,
            lP100Km: this.carDetails.lP100Km,
            airConditioned: this.carDetails.airConditioned
          });
        }
      },
      error => {
        console.log(error);
        this.alertify.message('błąd podczas ładowania szczegółów samochodu');
      }
    );
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.onUpdate();
    }
  }

  onSelectCarPhotoFile(event) {
    if (event.target.files.length === 0) {
      return;
    }

    for (const file of event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      this.editCarFormData = new FormData();
      this.editCarFormData.append(file.name, file);
    }
  }

  onUpdate() {
    if (this.editCarForm.valid) {
      this.alertify.message('aktualizuję dane samochodu...');

      this.editCarFormData.set('carId', this.editCarForm.value.carId);
      this.editCarFormData.set('brand', this.editCarForm.value.brand);
      this.editCarFormData.set('model', this.editCarForm.value.model);
      this.editCarFormData.set('body', this.editCarForm.value.body);
      this.editCarFormData.set(
        'description',
        this.editCarForm.value.description
      );
      this.editCarFormData.set('doors', this.editCarForm.value.doors);
      this.editCarFormData.set('fuel', this.editCarForm.value.fuel);
      this.editCarFormData.set(
        'transmission',
        this.editCarForm.value.transmission
      );
      this.editCarFormData.set('price', this.editCarForm.value.price);
      this.editCarFormData.set('year', this.editCarForm.value.year);
      this.editCarFormData.set('lP100Km', this.editCarForm.value.lP100Km);
      this.editCarFormData.set(
        'airConditioned',
        this.editCarForm.value.airConditioned
      );

      this.carService.updateCar(this.editCarFormData).subscribe(
        (res: any) => {
          if (+res.status === 200) {
            this.alertify.message('zaktualizowano dane samochodu');
            this.editCarForm.reset();
            this.editCarFormData = new FormData();
            this.router.navigate(['home/admin/cars']);
          }
        },
        error => {
          console.log(error);
          this.alertify.message('błąd podczas aktualizacji danych samochodu');
        }
      );
    } else {
      if (this.editCarForm.controls.brand.status === 'INVALID') {
        this.alertify.message('marka musi zawierać od 3 do 30 znaków');
        return;
      } else if (this.editCarForm.controls.model.status === 'INVALID') {
        this.alertify.message('model musi zawierać od 3 do 30 znaków');
        return;
      } else if (this.editCarForm.controls.body.status === 'INVALID') {
        this.alertify.message('podaj typ nadwozia');
        return;
      } else if (this.editCarForm.controls.description.status === 'INVALID') {
        this.alertify.message('opis musi zawierać od 3 do 200 znaków');
        return;
      } else if (this.editCarForm.controls.doors.status === 'INVALID') {
        this.alertify.message('podaj liczbę drzwi');
        return;
      } else if (this.editCarForm.controls.fuel.status === 'INVALID') {
        this.alertify.message('podaj rodzaj paliwa');
        return;
      } else if (this.editCarForm.controls.transmission.status === 'INVALID') {
        this.alertify.message('podaj rodzaj skrzyni biegów');
        return;
      } else if (this.editCarForm.controls.price.status === 'INVALID') {
        this.alertify.message('podaj cenę za dzień wypożyczenia');
        return;
      } else if (this.editCarForm.controls.year.status === 'INVALID') {
        this.alertify.message('podaj rocznik');
        return;
      } else if (this.editCarForm.controls.lP100Km.status === 'INVALID') {
        this.alertify.message('podaj średnie spalanie na 100 km');
        return;
      } else if (
        this.editCarForm.controls.airConditioned.status === 'INVALID'
      ) {
        this.alertify.message('podaj, czy samochód jest klimatyzowany');
        return;
      } else if (this.editCarForm.controls.photoFile.status === 'INVALID') {
        this.alertify.message('wybierz zdjęcie pojazdu');
        return;
      }
    }
  }

  onDelete() {
    this.carService.deleteCar(this.idByRoute).subscribe(
      (res: any) => {
        if (+res.status === 200) {
          this.alertify.message('usunięto samochód o id ' + this.idByRoute);
          this.router.navigate(['home/admin/cars']);
        }
      },
      error => {
        console.log(error);
        this.alertify.message('błąd podczas usuwania samochodu');
      }
    );
  }
}
