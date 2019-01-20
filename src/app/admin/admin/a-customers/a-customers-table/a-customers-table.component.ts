import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ACustomersTableDataSource } from './a-customers-table-datasource';

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
    'postalCode'
  ];

  ngOnInit() {
    this.dataSource = new ACustomersTableDataSource(
      this.paginator,
      this.sort,
      this.dataToTable
    );
  }
}
