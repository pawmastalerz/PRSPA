import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { OrderDetails } from 'src/models/OrderDetails';

/**
 * Data source for the HistoryTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class HistoryTableDataSource extends DataSource<OrderDetails> {
  data: OrderDetails[] = this.dataToTable;

  constructor(
    private paginator: MatPaginator,
    private sort: MatSort,
    private dataToTable: OrderDetails[]
  ) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<OrderDetails[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.paginator.length = this.data.length;
    this.paginator._intl.itemsPerPageLabel = 'Rekordów na stronę:';

    return merge(...dataMutations).pipe(
      map(() => {
        return this.getPagedData(this.getSortedData([...this.data]));
      })
    );
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: OrderDetails[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: OrderDetails[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'orderId':
          return compare(+a.orderId, +b.orderId, isAsc);
        case 'brand':
          return compare(a.carOrdered.brand, b.carOrdered.brand, isAsc);
        case 'model':
          return compare(a.carOrdered.model, b.carOrdered.model, isAsc);
        case 'year':
          return compare(+a.carOrdered.year, +b.carOrdered.year, isAsc);
        case 'totalPrice':
          return compare(+a.totalPrice, +b.totalPrice, isAsc);
        case 'reservedFrom':
          return compare(a.reservedFrom, b.reservedFrom, isAsc);
        case 'reservedTo':
          return compare(a.reservedTo, b.reservedTo, isAsc);
        case 'isReturned':
          return compare(a.isReturned, b.isReturned, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
