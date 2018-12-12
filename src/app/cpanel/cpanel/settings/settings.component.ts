import { Router } from '@angular/router';
import { AlertifyService } from 'src/services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import { UserData } from 'src/models/UserData';
import { PasswordMatch } from 'src/helpers/PasswordMatch';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  userData: UserData = null;

  passwordForm = new FormGroup(
    {
      current: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('.*[0-9].*')
      ]),
      newPasswordConfirm: new FormControl('', Validators.required)
    },
    {
      validators: PasswordMatch.MatchPasswordForUpdate
    }
  );

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {}

  onSubmit() {
    if (this.passwordForm.valid) {
      this.authService
        .updatePassword(
          this.passwordForm.value.current,
          this.passwordForm.value.newPassword
        )
        .subscribe(
          (res: any) => {
            if (+res.status === 200) {
              this.passwordForm.reset();
              this.alertify.message('zaktualizowano hasło');
            }
          },
          error => {
            if (+error.status === 401) {
              this.alertify.message('podano niepoprawne hasło');
              return;
            }
            console.log(error);
            this.alertify.message('problem podczas aktualizacji hasła');
          }
        );
    } else {
      if (this.passwordForm.controls.current.status === 'INVALID') {
        this.alertify.message('podaj aktualne hasło');
        return;
      } else if (this.passwordForm.controls.newPassword.status === 'INVALID') {
        this.alertify.message(
          'nowe hasło musi zawierać 3-30 znaków oraz co najmniej 1 cyfrę'
        );
        return;
      } else if (
        this.passwordForm.value.newPassword !==
        this.passwordForm.value.newPasswordConfirm
      ) {
        this.alertify.message('nowe hasła muszą się zgadzać');
        return;
      }
    }
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.onSubmit();
    }
  }

  onDelete() {
    this.authService.deleteAccount().subscribe(
      (res: any) => {
        if (+res.status === 200) {
          this.authService.logout();
          this.router.navigate(['home/main']);
          this.alertify.message(
            'całkowicie usunięto konto, wraz z wszelkimi danymi osobowymi i złożonymi zamówieniami'
          );
        }
      },
      error => {
        console.log(error);
        this.alertify.message('problem podczas usuwania konta');
      }
    );
  }
}
