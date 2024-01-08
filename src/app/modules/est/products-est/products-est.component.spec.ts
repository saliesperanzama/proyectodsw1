import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsEstComponent } from './products-est.component';

describe('ProductsEstComponent', () => {
  let component: ProductsEstComponent;
  let fixture: ComponentFixture<ProductsEstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsEstComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductsEstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
