import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { CurrentTableDataSource } from './current-table-datasource';
import { OrderService } from 'src/services/order.service';
import { AlertifyService } from 'src/services/alertify.service';

@Component({
  selector: 'app-current-table',
  templateUrl: './current-table.component.html',
  styleUrls: ['./current-table.component.scss']
})
export class CurrentTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: CurrentTableDataSource;

  @Input()
  dataToTable: any;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'orderId',
    'brand',
    'model',
    'year',
    'carDetails',
    'totalPrice',
    'reservedFrom',
    'reservedTo',
    'isReturned',
    'returnButton'
  ];

  constructor(
    private orderService: OrderService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.dataSource = new CurrentTableDataSource(
      this.paginator,
      this.sort,
      this.dataToTable
    );
  }

  onReturn(orderId: number) {
    this.orderService.returnCar(orderId).subscribe(
      () => {
        this.alertify.message('zwrócono poprawnie');
        this.router.navigate(['home/cpanel/history']);
      },
      error => {
        console.log(error);
        this.alertify.message(
          'wystąpił błąd podczas pobierania aktualnie wypożyczonych samochodów'
        );
      }
    );
  }
}
