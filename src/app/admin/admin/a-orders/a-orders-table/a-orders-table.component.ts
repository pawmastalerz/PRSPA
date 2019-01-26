import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { AOrdersTableDataSource } from './a-orders-table-datasource';

@Component({
  selector: 'app-a-orders-table',
  templateUrl: './a-orders-table.component.html',
  styleUrls: ['./a-orders-table.component.scss']
})
export class AOrdersTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: AOrdersTableDataSource;

  @Input()
  dataToTable: any;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'orderId',
    'brand',
    'model',
    'year',
    'userId',
    'detailsButton',
    'totalPrice',
    'reservedFrom',
    'reservedTo',
    'isReturned'
  ];

  ngOnInit() {
    this.dataSource = new AOrdersTableDataSource(
      this.paginator,
      this.sort,
      this.dataToTable
    );
  }
}
