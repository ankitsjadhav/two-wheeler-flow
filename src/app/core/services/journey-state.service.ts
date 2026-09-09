import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JourneyStateService {
  readonly monthlyIncome = signal<number>(0);

  setMonthlyIncome(income: number): void {
    this.monthlyIncome.set(income);
  }
}
