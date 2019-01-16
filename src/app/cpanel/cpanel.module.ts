import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CpanelComponent } from './cpanel/cpanel.component';
import { SidebarComponent } from './cpanel/sidebar/sidebar.component';
import { HistoryComponent } from './cpanel/history/history.component';
import { CurrentComponent } from './cpanel/current/current.component';
import { PersonalComponent } from './cpanel/personal/personal.component';
import { SettingsComponent } from './cpanel/settings/settings.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CurrentItemComponent } from './cpanel/current/current-item/current-item.component';
import { OwlModule } from 'ngx-owl-carousel';
import { NeworderComponent } from './cpanel/neworder/neworder.component';
import { HistoryTableComponent } from './cpanel/history/history-table/history-table.component';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';

@NgModule({
  declarations: [
    CpanelComponent,
    SidebarComponent,
    HistoryComponent,
    CurrentComponent,
    PersonalComponent,
    SettingsComponent,
    CurrentItemComponent,
    NeworderComponent,
    HistoryTableComponent
  ],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, OwlModule, MatTableModule, MatPaginatorModule, MatSortModule]
})
export class CpanelModule {}
