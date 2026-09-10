import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JourneyStateService } from '../../core/services/journey-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-loan',
  imports: [ReactiveFormsModule],
  templateUrl: './vehicle-loan.html',
  styleUrl: './vehicle-loan.css',
})
export class VehicleLoan {

  vehicleAPI: any[] = [];
  vehicleModelAPI: any[] = [];
  variantAPI: any[] = [];

  private http = inject(HttpClient);
  private journeyState = inject(JourneyStateService);
  private router = inject(Router);

  vehicleLoan = new FormGroup({

    vehiclemake: new FormControl('', Validators.required),
    vehiclemodel: new FormControl('', Validators.required),
    variant: new FormControl('', Validators.required),
  })

  ngOnInit() {
    this.getVehicle();
  }

  getVehicle() {
    this.http.get<any>(`https://fleetcatalog.disturbingbyte.pt/v1/makes?pageSize=100`)
      .subscribe(response => {
        this.vehicleAPI = response.items;
      });
  }

  getModel(makeId: string) {
    this.http.get<any>(`https://fleetcatalog.disturbingbyte.pt/v1/makes/${makeId}/models?pageSize=100`)
      .subscribe(response => {
        this.vehicleModelAPI = response.items
      })
  }

  getvariant(modelId: string) {
    this.http.get<any>(`https://fleetcatalog.disturbingbyte.pt/v1/models/${modelId}/variants?pageSize=100`)
      .subscribe(response => {
        this.variantAPI = response.items;
      })
  }

  loan = new FormGroup({
    slider: new FormControl(20000, Validators.required)
  });

  onRoadPrice = 185400;
  interestRate = 12.5;
  tenure = 12;

  get monthlyIncome(): number {
    return this.journeyState.monthlyIncome();
  }

  get loanAmount(): number {
    return Number(this.loan.controls.slider.value) || 20000;
  }

  get loanamount(): number {
    return this.loanAmount;
  }

  get fundingCap(): number {
    return Math.round(this.onRoadPrice * 0.85);
  }

  get fundingPercentage(): number {
    return Math.round((this.loanAmount / this.onRoadPrice) * 100);
  }

  get fundingpercentage(): number {
    return this.fundingPercentage;
  }

  get downPayment(): number {
    return this.onRoadPrice - this.loanAmount;
  }

  get downpayment(): number {
    return this.downPayment;
  }

  get downpayement(): number {
    return this.downPayment;
  }

  selectTenure(value: number) {
    this.tenure = value;
  }

  get emi(): number {
    const p = this.loanAmount;
    const r = this.interestRate / 12 / 100;
    const n = this.tenure;
    if (r === 0 || n === 0) return 0;
    const emiVal = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emiVal);
  }

  get amountPayable(): number {
    return this.emi * this.tenure;
  }

  get interestPayable(): number {
    return this.amountPayable - this.loanAmount;
  }

  get emiPercentage(): number {
    if (this.monthlyIncome <= 0) return 0;
    return Math.round((this.emi / this.monthlyIncome) * 100);
  }

  get eligibilityStatus(): 'Not eligible' | 'Under review' | "You're eligible" {
    if (this.loanAmount > this.fundingCap) {
      return 'Not eligible';
    }
    if (this.monthlyIncome > 0 && (this.emi / this.monthlyIncome) > 0.5) {
      return 'Under review';
    }
    return "You're eligible";
  }

  get eligibilityMessage(): string {
    if (this.loanAmount > this.fundingCap) {
      return `₹${this.loanAmount} is above the 85% funding cap for this vehicle. Reduce the amount to ₹${this.fundingCap} or less.`;
    }
    if (this.monthlyIncome > 0 && (this.emi / this.monthlyIncome) > 0.5) {
      return `Your EMIs would use ${this.emiPercentage}% of your income. A credit officer will review this within one working day.`;
    }
    return `Your income supports an EMI of ₹${this.emi}. Final approval after document verification.`;
  }

  onContinue() {
    if (this.vehicleLoan.valid && this.loan.valid) {
      return this.router.navigate(['/bank'])
    } else {
      return this.vehicleLoan.untouched && this.loan.untouched
    }
  }
}
