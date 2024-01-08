import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPsComponent } from './add-ps.component';

describe('AddPsComponent', () => {
  let component: AddPsComponent;
  let fixture: ComponentFixture<AddPsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
