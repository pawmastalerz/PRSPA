import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { FleetTableDataSource } from './fleet-table-datasource';

@Component({
  selector: 'app-fleet-table',
  templateUrl: './fleet-table.component.html',
  styleUrls: ['./fleet-table.component.scss']
})
export class FleetTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: FleetTableDataSource;

  @Input()
  dataToTable: any;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    // 'carId',
    'brand',
    'model',
    // 'body',
    // 'doors',
    'fuel',
    'transmission',
    // 'price',
    'year',
    // 'lP100Km',
    'airConditioned',
    'carDetails'
  ];

  ngOnInit() {
    this.dataSource = new FleetTableDataSource(
      this.paginator,
      this.sort,
      this.dataToTable
    );
  }
}
