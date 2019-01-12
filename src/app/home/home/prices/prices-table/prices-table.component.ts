import { CarForUser } from 'src/models/carForUser';
import { AlertifyService } from 'src/services/alertify.service';
import { CarService } from 'src/services/car.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { PricesTableDataSource } from './prices-table-datasource';

@Component({
  selector: 'app-prices-table',
  templateUrl: './prices-table.component.html',
  styleUrls: ['./prices-table.component.scss']
})
export class PricesTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: PricesTableDataSource;
  dataToTable: any;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['brand', 'model', 'year', 'price'];

  constructor(
    private carService: CarService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.carService.getWholeFleetForUser().subscribe(
      (res: any) => {
        if (+res.status === 200) {
          this.dataToTable = res.body;
          this.dataSource = new PricesTableDataSource(
            this.paginator,
            this.sort,
            this.dataToTable
          );
        }
      },
      error => {
        console.log(error);
        this.alertify.message('błąd podczas pobierania floty z bazy danych');
      }
    );
  }
}
