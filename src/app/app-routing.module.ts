import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component'
import { BooksPageComponent } from './books-page/books-page.component'
import { HomeComponent } from './home/home.component';
import { HomeAdminComponent } from './modules/admin/home-admin/home-admin.component';
import { ProductsAdminComponent } from './modules/admin/products-admin/products-admin.component';
import { ServicesAdminComponent } from './modules/admin/services-admin/services-admin.component';
import { StudentsAdminComponent } from './modules/admin/students-admin/students-admin.component';
import { UsersAdminComponent } from './modules/admin/users-admin/users-admin.component';
import { ProductsEstComponent } from './modules/est/products-est/products-est.component';
import { ServicesEstComponent } from './modules/est/services-est/services-est.component';
import { AddPsComponent } from './modules/est/add-ps/add-ps.component'

const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'login', component: LoginPageComponent },
    { path: 'register', component: RegisterPageComponent },
    // { path: '**', redirectTo: 'login', pathMatch: 'full' } // redirect to `first-component`
    //Rutas del administrador
    { path: 'home-admin', component: HomeAdminComponent },
    { path: 'products-admin', component: ProductsAdminComponent },
    { path: 'services-admin', component: ServicesAdminComponent },
    { path: 'students-admin', component: StudentsAdminComponent },
    { path: 'users-admin', component: UsersAdminComponent },
    //Rutas del estudiante
    { path: 'products-est', component: ProductsEstComponent },
    { path: 'services-est', component: ServicesEstComponent },
    { path: 'add-ps', component: AddPsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }