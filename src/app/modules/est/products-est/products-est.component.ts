import { Component } from '@angular/core';

@Component({
  selector: 'app-products-est',
  templateUrl: './products-est.component.html',
  styleUrl: './products-est.component.css'
})
export class ProductsEstComponent {
  public userRole = localStorage.getItem('userRole');
}
