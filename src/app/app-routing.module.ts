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
      { path: 'cpanel', component: CpanelComponent, pathMatch: 'full' }
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
