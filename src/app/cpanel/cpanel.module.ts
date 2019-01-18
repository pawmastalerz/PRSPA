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
import { NeworderComponent } from './cpanel/neworder/neworder.component';
import { HistoryTableComponent } from './cpanel/history/history-table/history-table.component';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { CurrentTableComponent } from './cpanel/current/current-table/current-table.component';

@NgModule({
  declarations: [
    CpanelComponent,
    SidebarComponent,
    HistoryComponent,
    CurrentComponent,
    PersonalComponent,
    SettingsComponent,
    NeworderComponent,
    HistoryTableComponent,
    CurrentTableComponent
  ],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, MatTableModule, MatPaginatorModule, MatSortModule]
})
export class CpanelModule {}
