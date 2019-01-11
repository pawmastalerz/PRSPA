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

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new PricesTableDataSource(this.paginator, this.sort);
  }
}
