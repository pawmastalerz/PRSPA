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
}
