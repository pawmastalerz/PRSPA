import { AuthService } from 'src/services/auth.service';
import { User } from './../../../../models/User';
import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/services/order.service';
import { AlertifyService } from 'src/services/alertify.service';

@Component({
  selector: 'app-a-customers',
  templateUrl: './a-customers.component.html',
  styleUrls: ['./a-customers.component.scss']
})
export class ACustomersComponent implements OnInit {
  allUsers: Array<User> = [];

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.authService.adminGetAllUsers().subscribe(
      (res: any) => {
        if (+res.status === 200) {
          this.allUsers = res.body;
        }
      },
      error => {
        console.log(error);
        this.alertify.message(
          'wystąpił błąd podczas pobierania wszystkich klientów'
        );
      }
    );
  }
}
