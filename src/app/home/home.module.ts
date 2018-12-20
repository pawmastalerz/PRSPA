import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './home/navbar/navbar.component';
import { FooterComponent } from './home/footer/footer.component';
import { RouterModule } from '@angular/router';
import { MainComponent } from './home/main/main.component';
import { PricesComponent } from './home/prices/prices.component';
import { LoginComponent } from './home/login/login.component';
import { ContactComponent } from './home/contact/contact.component';
import { SearchComponent } from './home/main/search/search.component';
import { FleetComponent } from './home/main/fleet/fleet.component';
import { OwlModule } from 'ngx-owl-carousel';
import { FleetTileComponent } from './home/main/fleet/fleet-tile/fleet-tile.component';
import { CarDetailsComponent } from './home/car-details/car-details.component';
import { RegisterComponent } from './home/register/register.component';
import { SearchResultsComponent } from './home/search-results/search-results.component';
import { SearchResultsItemComponent } from './home/search-results/search-results-item/search-results-item.component';

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    MainComponent,
    PricesComponent,
    LoginComponent,
    ContactComponent,
    SearchComponent,
    FleetComponent,
    FleetTileComponent,
    CarDetailsComponent,
    RegisterComponent,
    SearchResultsComponent,
    SearchResultsItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    OwlModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomeModule {}
