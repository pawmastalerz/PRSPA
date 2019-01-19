import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
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

@NgModule({
  declarations: [AdminComponent, ASidebarComponent, ACarsComponent, ACustomersComponent, AOrdersComponent, AOrdersTableComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class AdminModule {}
