import { AlertifyService } from './../../../../../services/alertify.service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ACarsTableDataSource } from './a-cars-table-datasource';
import { CarService } from 'src/services/car.service';

@Component({
  selector: 'app-a-cars-table',
  templateUrl: './a-cars-table.component.html',
  styleUrls: ['./a-cars-table.component.scss']
})
export class ACarsTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ACarsTableDataSource;

  @Input()
  dataToTable: any;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'carId',
    'brand',
    'model',
    'body',
    'doors',
    'fuel',
    'transmission',
    'price',
    'year',
    'lP100Km',
    'airConditioned'
  ];

  ngOnInit() {
    this.dataSource = new ACarsTableDataSource(this.paginator, this.sort, this.dataToTable);
  }
}
