import { Injectable } from '@angular/core';
import * as alertify from 'node_modules/alertifyjs/build/alertify.min.js';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {
  constructor() {}

  message(message: string) {
    alertify.message(message);
  }
}
