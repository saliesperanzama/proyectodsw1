import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksModalComponent } from './books-modal/books-modal.component';
import { BooksPageComponent } from './books-page/books-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { HomeAdminComponent } from './modules/admin/home-admin/home-admin.component';
import { ProductsAdminComponent } from './modules/admin/products-admin/products-admin.component';
import { ServicesAdminComponent } from './modules/admin/services-admin/services-admin.component';
import { StudentsAdminComponent } from './modules/admin/students-admin/students-admin.component';
import { ProductsEstComponent } from './modules/est/products-est/products-est.component';
import { ServicesEstComponent } from './modules/est/services-est/services-est.component';
import { AddPsComponent } from './modules/est/add-ps/add-ps.component';
import { UsersAdminComponent } from './modules/admin/users-admin/users-admin.component'

@NgModule({
  declarations: [
    AppComponent,
    BooksModalComponent,
    BooksPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    HomeComponent,
    HomeAdminComponent,
    ProductsAdminComponent,
    ServicesAdminComponent,
    StudentsAdminComponent,
    ProductsEstComponent,
    ServicesEstComponent,
    AddPsComponent,
    UsersAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
