import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Car } from 'src/models/car';

/**
 * Data source for the FleetTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class FleetTableDataSource extends DataSource<Car> {
  data: Car[] = this.dataToTable;

  constructor(
    private paginator: MatPaginator,
    private sort: MatSort,
    private dataToTable: Car[]
  ) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Car[]> {
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
  private getPagedData(data: Car[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Car[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'carId':
          return compare(+a.carId, +b.carId, isAsc);
        case 'brand':
          return compare(a.brand, b.brand, isAsc);
        case 'model':
          return compare(a.model, b.model, isAsc);
        case 'body':
          return compare(a.body, b.body, isAsc);
        case 'doors':
          return compare(+a.doors, +b.doors, isAsc);
        case 'fuel':
          return compare(a.fuel, b.fuel, isAsc);
        case 'transmission':
          return compare(a.transmission, b.transmission, isAsc);
        case 'price':
          return compare(+a.price, +b.price, isAsc);
        case 'year':
          return compare(+a.year, +b.year, isAsc);
        case 'lP100Km':
          return compare(+a.lP100Km, +b.lP100Km, isAsc);
        case 'airConditioned':
          return compare(a.airConditioned, b.airConditioned, isAsc);
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
