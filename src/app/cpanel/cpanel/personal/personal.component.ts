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
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    streetNumber: new FormControl('', Validators.required),
    postalCode: new FormControl('', Validators.required)
  });

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService
  ) {
    this.alertify.message('pobieram dane osobowe...');
    this.getPersonalData();
  }

  ngOnInit() {}

  onSubmit() {
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
          this.alertify.message('pobrano pomyślnie');
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
