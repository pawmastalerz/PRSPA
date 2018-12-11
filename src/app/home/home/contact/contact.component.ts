import { AlertifyService } from 'src/services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    body: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(300)
    ])
  });

  constructor(private alertify: AlertifyService) {}

  ngOnInit() {}

  onSubmit() {
    this.contactForm.reset();
    this.alertify.message('dziękujemy za wiadomość!');
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.onSubmit();
    }
  }
}
