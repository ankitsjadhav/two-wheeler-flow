import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleLoan } from './vehicle-loan';

describe('VehicleLoan', () => {
  let component: VehicleLoan;
  let fixture: ComponentFixture<VehicleLoan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleLoan]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleLoan);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
