import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {
  personalForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    streetNumber: new FormControl('', Validators.required),
    postalCode: new FormControl('', Validators.required)
  });

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onSubmit() {
    this.authService.updatePersonal(
      this.personalForm.value.username,
      this.personalForm.value.email,
      this.personalForm.value.city,
      this.personalForm.value.street,
      this.personalForm.value.streetNumber,
      this.personalForm.value.postalCode
    );
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.onSubmit();
    }
  }
}
