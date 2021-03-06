import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { User } from 'src/models/User';

/**
 * Data source for the ACustomersTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ACustomersTableDataSource extends DataSource<User> {
  data: User[] = this.dataToTable;

  constructor(
    private paginator: MatPaginator,
    private sort: MatSort,
    private dataToTable: User[]
  ) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<User[]> {
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
  private getPagedData(data: User[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: User[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'userId':
          return compare(+a.userId, +b.userId, isAsc);
        case 'username':
          return compare(a.username, b.username, isAsc);
        case 'email':
          return compare(a.email, b.email, isAsc);
        case 'city':
          return compare(a.city, b.city, isAsc);
        case 'street':
          return compare(a.street, b.street, isAsc);
        case 'streetNumber':
          return compare(a.streetNumber, b.streetNumber, isAsc);
        case 'postalCode':
          return compare(a.postalCode, b.postalCode, isAsc);
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
