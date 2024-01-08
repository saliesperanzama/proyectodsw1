import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesAdminComponent } from './services-admin.component';

describe('ServicesAdminComponent', () => {
  let component: ServicesAdminComponent;
  let fixture: ComponentFixture<ServicesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServicesAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
