import { Routes } from '@angular/router';
import { PersonalDetails } from './features/personal-details/personal-details';
import { VehicleLoan } from './features/vehicle-loan/vehicle-loan';
import { BankOtp } from './features/bank-otp/bank-otp';
import { Success } from './features/success/success';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'personal-details',
        pathMatch: 'full'
    },
    {
        path: 'personal-details',
        component: PersonalDetails,
    }, {
        path: 'vehicle-loan',
        component: VehicleLoan
    },
    {
        path: "bank",
        component: BankOtp
    }, {
        path: "submit",
        component: Success
    }
];
