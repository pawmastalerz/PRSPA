import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
    body: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(200)
    ]),
    doors: new FormControl('', [Validators.required]),
    fuel: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    transmission: new FormControl('', [
      Validators.required
    ]),
    price: new FormControl('', [
      Validators.required
    ]),
    year: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(4)
    ]),
    lP100Km: new FormControl('', [
      Validators.required
    ]),
    airConditioned: new FormControl('', [
      Validators.required
    ]),
  });

  constructor() {}

  ngOnInit() {}
}
