import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ACustomersTableDataSource } from './a-customers-table-datasource';
import { AuthService } from 'src/services/auth.service';
import { AlertifyService } from 'src/services/alertify.service';

@Component({
  selector: 'app-a-customers-table',
  templateUrl: './a-customers-table.component.html',
  styleUrls: ['./a-customers-table.component.scss']
})
export class ACustomersTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ACustomersTableDataSource;

  @Input()
  dataToTable: any;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'userId',
    'username',
    'email',
    'city',
    'street',
    'streetNumber',
    'postalCode',
    'detailsButton'
  ];

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.dataSource = new ACustomersTableDataSource(
      this.paginator,
      this.sort,
      this.dataToTable
    );
  }

  onDelete(userId: number) {
    this.authService.deleteSpecificAccount(userId).subscribe(
      (res: any) => {
        if (+res.status === 200) {
          this.alertify.message(
            'usunięto dane użytkownika o id ' + userId + ', zachowując jego zamówienia'
          );
        }
      },
      error => {
        console.log(error);
        this.alertify.message('błąd podczas usuwania konta');
      }
    );
  }
}
