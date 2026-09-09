import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankOtp } from './bank-otp';

describe('BankOtp', () => {
  let component: BankOtp;
  let fixture: ComponentFixture<BankOtp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankOtp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankOtp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
