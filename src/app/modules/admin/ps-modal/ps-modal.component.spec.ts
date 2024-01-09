import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsModalComponent } from './ps-modal.component';

describe('PsModalComponent', () => {
  let component: PsModalComponent;
  let fixture: ComponentFixture<PsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PsModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
