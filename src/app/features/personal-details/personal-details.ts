import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, MinLengthValidator, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JourneyStateService } from '../../core/services/journey-state.service';


@Component({
  selector: 'app-personal-details',
  imports: [ReactiveFormsModule],
  templateUrl: './personal-details.html',
  styleUrl: './personal-details.css',
})
export class PersonalDetails {

  private router = inject(Router);
  private journeyState = inject(JourneyStateService);

  genderoptions = ['Male', 'Female', 'Other'];

  personaldetails = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    dob: new FormControl('', [Validators.required, this.agevalidator(21, 60)]),
    gender: new FormControl('', Validators.required),
    pan: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]$/)
    ]),
    employement: new FormControl('', Validators.required),
    income: new FormControl('', [Validators.required, Validators.min(15000)]),
    pincode: new FormControl('', [Validators.required, Validators.pattern(/^\d{6}$/)]),
    city: new FormControl('', Validators.required),
  })

  agevalidator(minAge: number, maxAge: number) {
    return (control: AbstractControl) => {
      const dob = new Date(control.value);

      const today = new Date();

      let age = today.getFullYear() - dob.getFullYear();

      if (age < minAge || age > maxAge) {
        return { agerange: true };
      }
      return null;
    }
  }

  onPanInput(event: Event) {
    const input = event.target as HTMLInputElement;

    const value = input.value.toUpperCase();

    this.personaldetails.controls.pan.setValue(value);
  }

  onContinue() {
    if (this.personaldetails.valid) {
      const incomeValue = Number(this.personaldetails.controls.income.value) || 0;
      this.journeyState.setMonthlyIncome(incomeValue);
      this.router.navigate(['/vehicle-loan']);
    } else {
      this.personaldetails.markAllAsTouched();
    }
  }
}
