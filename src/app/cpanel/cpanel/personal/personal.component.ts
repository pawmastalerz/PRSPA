import { AlertifyService } from 'src/services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import { UserData } from 'src/models/UserData';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {
  userData: UserData = null;

  personalForm = new FormGroup({
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
  });

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService
  ) {
    this.getPersonalData();
  }

  ngOnInit() {}

  onSubmit() {
    if (this.personalForm.valid) {
      this.authService
        .updatePersonal(
          this.personalForm.value.username,
          this.personalForm.value.email,
          this.personalForm.value.city,
          this.personalForm.value.street,
          this.personalForm.value.streetNumber,
          this.personalForm.value.postalCode
        )
        .subscribe(
          (res: any) => {
            if (+res.status === 200) {
              this.alertify.message('zaktualizowano dane osobowe');
            }
          },
          error => {
            console.log(error);
            this.alertify.message(
              'problem podczas aktualizacji danych osobowych'
            );
          }
        );
    } else {
      if (this.personalForm.controls.username.status === 'INVALID') {
        this.alertify.message('login musi zawierać od 3 do 30 znaków');
        return;
      } else if (this.personalForm.controls.email.status === 'INVALID') {
        this.alertify.message('podaj prawidlowy e-mail');
        return;
      } else if (this.personalForm.controls.city.status === 'INVALID') {
        this.alertify.message('miasto musi zawierać od 3 do 30 znaków');
        return;
      } else if (this.personalForm.controls.street.status === 'INVALID') {
        this.alertify.message('ulica musi zawierać od 3 do 30 znaków');
        return;
      } else if (this.personalForm.controls.streetNumber.status === 'INVALID') {
        this.alertify.message('numer posesji musi zawierać od 1 do 7 znaków');
        return;
      } else if (this.personalForm.controls.postalCode.status === 'INVALID') {
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

  getPersonalData() {
    this.authService.getPersonalData().subscribe(
      (res: any) => {
        if (+res.status === 200) {
          this.userData = res.body;
          this.personalForm.patchValue({
            username: this.userData.username,
            email: this.userData.email,
            city: this.userData.city,
            street: this.userData.street,
            streetNumber: this.userData.streetNumber,
            postalCode: this.userData.postalCode
          });
        }
      },
      error => {
        console.log(error);
        this.alertify.message('problem podczas pobierania danych osobowych');
      }
    );
  }

  notAllowed() {
    this.alertify.message('nie można edytować tego pola');
  }
}
