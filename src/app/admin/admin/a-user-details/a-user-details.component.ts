import { AlertifyService } from 'src/services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/User';
import { AuthService } from 'src/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-a-user-details',
  templateUrl: './a-user-details.component.html',
  styleUrls: ['./a-user-details.component.scss']
})
export class AUserDetailsComponent implements OnInit {
  userDetails: User = new User();
  idByRoute = this.route.snapshot.params['id'];

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails() {
    this.authService.getSpecificPersonalData(this.idByRoute).subscribe(
      (res: any) => {
        if (+res.status === 200) {
          this.userDetails = res.body;
          console.log(this.userDetails);
        }
      },
      error => {
        console.log(error);
        this.alertify.message('błąd podczas ładowania szczegółów użytkownika');
      }
    );
  }
}
