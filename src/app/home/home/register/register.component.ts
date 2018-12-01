import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isAuth: boolean;

  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    repeatPassword: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    streetNumber: new FormControl('', Validators.required),
    postalCode: new FormControl('', Validators.required)
  });

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.isAuth$.subscribe(isAuth => (this.isAuth = isAuth));
  }

  onSubmit() {
    this.authService.register(
      this.registerForm.value.username,
      this.registerForm.value.email,
      this.registerForm.value.password,
      this.registerForm.value.city,
      this.registerForm.value.street,
      this.registerForm.value.streetNumber,
      this.registerForm.value.postalCode,
    );
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.onSubmit();
    }
  }

}
