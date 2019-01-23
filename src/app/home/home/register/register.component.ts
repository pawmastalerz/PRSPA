import { AlertifyService } from 'src/services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import { PasswordMatch } from 'src/helpers/PasswordMatch';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isAuth: boolean;

  registerForm = new FormGroup(
    {
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(70)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('.*[0-9].*')
      ]),
      repeatPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]),
      city: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]),
      street: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]),
      streetNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(7)
      ]),
      postalCode: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{2}-[0-9]{3}')
      ])
    },
    {
      validators: PasswordMatch.MatchPassword
    }
  );

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.authService.isAuth$.subscribe(isAuth => (this.isAuth = isAuth));
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value);
    } else {
      if (this.registerForm.controls.username.status === 'INVALID') {
        this.alertify.message('login musi zawierać od 3 do 30 znaków');
        return;
      } else if (this.registerForm.controls.email.status === 'INVALID') {
        this.alertify.message('podaj prawidlowy e-mail');
        return;
      } else if (this.registerForm.controls.password.status === 'INVALID') {
        this.alertify.message(
          'hasło musi zawierać 3-30 znaków oraz co najmniej 1 cyfrę'
        );
        return;
      } else if (
        this.registerForm.value.password !==
        this.registerForm.value.repeatPassword
      ) {
        this.alertify.message('podane hasła muszą się zgadzać');
        return;
      } else if (this.registerForm.controls.city.status === 'INVALID') {
        this.alertify.message('miasto musi zawierać od 3 do 30 znaków');
        return;
      } else if (this.registerForm.controls.street.status === 'INVALID') {
        this.alertify.message('ulica musi zawierać od 3 do 30 znaków');
        return;
      } else if (this.registerForm.controls.streetNumber.status === 'INVALID') {
        this.alertify.message('numer posesji musi zawierać od 1 do 7 znaków');
        return;
      } else if (this.registerForm.controls.postalCode.status === 'INVALID') {
        this.alertify.message('kod pocztowy musi mieć format XX-XXX');
        return;
      }
    }
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.onSubmit();
    }
  }
}
