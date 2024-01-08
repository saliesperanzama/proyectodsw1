import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesEstComponent } from './services-est.component';

describe('ServicesEstComponent', () => {
  let component: ServicesEstComponent;
  let fixture: ComponentFixture<ServicesEstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServicesEstComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicesEstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
