import { MatTableModule, MatPaginatorModule, MatSortModule, MatTabsModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { ASidebarComponent } from './admin/a-sidebar/a-sidebar.component';
import { RouterModule } from '@angular/router';
import { ACarsComponent } from './admin/a-cars/a-cars.component';
import { ACustomersComponent } from './admin/a-customers/a-customers.component';
import { AOrdersComponent } from './admin/a-orders/a-orders.component';
import { AOrdersTableComponent } from './admin/a-orders/a-orders-table/a-orders-table.component';
import { ACurrentOrdersTableComponent } from './admin/a-orders/a-current-orders-table/a-current-orders-table.component';
import { ACustomersTableComponent } from './admin/a-customers/a-customers-table/a-customers-table.component';
import { ACarsTableComponent } from './admin/a-cars/a-cars-table/a-cars-table.component';
import { ACarsNewComponent } from './admin/a-cars/a-cars-new/a-cars-new.component';
import { ACarDetailsComponent } from './admin/a-cars/a-car-details/a-car-details.component';
import { AUserDetailsComponent } from './admin/a-user-details/a-user-details.component';

@NgModule({
  declarations: [AdminComponent, ASidebarComponent, ACarsComponent, ACustomersComponent, AOrdersComponent, AOrdersTableComponent, ACurrentOrdersTableComponent, ACustomersTableComponent, ACarsTableComponent, ACarsNewComponent, ACarDetailsComponent, AUserDetailsComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule
  ]
})
export class AdminModule {}
