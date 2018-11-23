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

@NgModule({
  declarations: [HomeComponent, NavbarComponent, FooterComponent, MainComponent, PricesComponent, LoginComponent, ContactComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class HomeModule { }
