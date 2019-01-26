import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { HistoryTableDataSource } from './history-table-datasource';

@Component({
  selector: 'app-history-table',
  templateUrl: './history-table.component.html',
  styleUrls: ['./history-table.component.scss']
})
export class HistoryTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: HistoryTableDataSource;

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
    'isReturned'
  ];

  ngOnInit() {
    this.dataSource = new HistoryTableDataSource(
      this.paginator,
      this.sort,
      this.dataToTable
    );
  }
}
