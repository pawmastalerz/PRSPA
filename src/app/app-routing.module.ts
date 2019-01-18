import { ACustomersComponent } from './admin/admin/a-customers/a-customers.component';
import { AOrdersComponent } from './admin/admin/a-orders/a-orders.component';
import { SettingsComponent } from './cpanel/cpanel/settings/settings.component';
import { HistoryComponent } from './cpanel/cpanel/history/history.component';
import { RegisterComponent } from './home/home/register/register.component';
import { CarDetailsComponent } from './home/home/car-details/car-details.component';
import { HomeComponent } from './home/home/home.component';
import { LandingComponent } from './landing/landing/landing.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './home/home/main/main.component';
import { PricesComponent } from './home/home/prices/prices.component';
import { ContactComponent } from './home/home/contact/contact.component';
import { LoginComponent } from './home/home/login/login.component';
import { CpanelComponent } from './cpanel/cpanel/cpanel.component';
import { CurrentComponent } from './cpanel/cpanel/current/current.component';
import { PersonalComponent } from './cpanel/cpanel/personal/personal.component';
import { SearchResultsComponent } from './home/home/search-results/search-results.component';
import { NeworderComponent } from './cpanel/cpanel/neworder/neworder.component';
import { AdminComponent } from './admin/admin/admin.component';
import { ACarsComponent } from './admin/admin/a-cars/a-cars.component';

const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'main', component: MainComponent, pathMatch: 'full' },
      { path: 'details/:id', component: CarDetailsComponent, pathMatch: 'full' },
      { path: 'pricing', component: PricesComponent, pathMatch: 'full' },
      { path: 'contact', component: ContactComponent, pathMatch: 'full' },
      { path: 'login', component: LoginComponent, pathMatch: 'full' },
      { path: 'register', component: RegisterComponent, pathMatch: 'full' },
      { path: 'search_results', component: SearchResultsComponent, pathMatch: 'full' },
      { path: 'cpanel', component: CpanelComponent, children: [
        { path: 'new_order', component: NeworderComponent, pathMatch: 'full' },
        { path: 'history', component: HistoryComponent, pathMatch: 'full' },
        { path: 'current', component: CurrentComponent, pathMatch: 'full' },
        { path: 'personal', component: PersonalComponent, pathMatch: 'full' },
        { path: 'settings', component: SettingsComponent, pathMatch: 'full' },
      ] },
      { path: 'admin', component: AdminComponent, children: [
        { path: 'orders', component: AOrdersComponent, pathMatch: 'full' },
        { path: 'cars', component: ACarsComponent, pathMatch: 'full' },
        { path: 'customers', component: ACustomersComponent, pathMatch: 'full' }
      ] },
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
