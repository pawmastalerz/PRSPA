import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ACurrentOrdersTableDataSource } from './a-current-orders-table-datasource';

@Component({
  selector: 'app-a-current-orders-table',
  templateUrl: './a-current-orders-table.component.html',
  styleUrls: ['./a-current-orders-table.component.scss']
})
export class ACurrentOrdersTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ACurrentOrdersTableDataSource;

  @Input()
  dataToTable: any;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'orderId',
    'brand',
    'model',
    'year',
    'userId',
    'totalPrice',
    'reservedFrom',
    'reservedTo',
    'isReturned'
  ];

  ngOnInit() {
    this.dataSource = new ACurrentOrdersTableDataSource(
      this.paginator,
      this.sort,
      this.dataToTable
    );
  }
}
