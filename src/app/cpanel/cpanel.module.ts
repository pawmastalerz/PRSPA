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

@NgModule({
  declarations: [
    CpanelComponent,
    SidebarComponent,
    HistoryComponent,
    CurrentComponent,
    PersonalComponent,
    SettingsComponent
  ],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule]
})
export class CpanelModule {}
