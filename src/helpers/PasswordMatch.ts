import { AbstractControl } from '@angular/forms';

export class PasswordMatch {

  static MatchPassword(abstract: AbstractControl) {
    const password = abstract.get('password').value;
    const confirmPassword = abstract.get('repeatPassword').value;
    if (password !== confirmPassword) {
      abstract.get('repeatPassword').setErrors({ MatchPassword: true });
    } else {
      return null;
    }
  }

  static MatchPasswordForUpdate(abstract: AbstractControl) {
    const newPassword = abstract.get('newPassword').value;
    const newPasswordConfirm = abstract.get('newPasswordConfirm').value;
    if (newPassword !== newPasswordConfirm) {
      abstract.get('newPasswordConfirm').setErrors({ MatchPassword: true });
    } else {
      return null;
    }
  }
}
