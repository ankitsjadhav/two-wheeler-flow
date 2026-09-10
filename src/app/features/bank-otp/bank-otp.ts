import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bank-otp',
  imports: [ReactiveFormsModule],
  templateUrl: './bank-otp.html',
  styleUrl: './bank-otp.css',
})
export class BankOtp {

  private http = inject(HttpClient);
  private router = inject(Router)

  bankNameAPI: any[] = [];

  bank = new FormGroup({
    bankName: new FormControl('', Validators.required),
    mobile: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
    otp: new FormControl('', [Validators.required, Validators.pattern(/^\d{6}$/)])
  })

  thebankName() {
    this.http.get<any>('https://raw.githubusercontent.com/razorpay/ifsc/master/src/banknames.json')
      .subscribe(response => {
        this.bankNameAPI = Object.values(response);
      })
  }

  resendTimer = 0;
  canResend = true;
  hasResent = false;
  private resendInterval: any;
  resendMessage = '';


  resend() {
    if (!this.hasResent) {
      this.hasResent = true
      this.resendMessage = "OTP sent Successfully";
    }

    this.canResend = false;
    this.resendTimer = 5;

    this.resendMessage = "You have to wait 5 seconds to resend OTP";

    this.resendInterval = setInterval(() => {
      this.resendTimer--;

      if (this.resendTimer === 0) {
        clearInterval(this.resendInterval);
        this.resendInterval = undefined;
        this.canResend = true;
      }
    }, 1000);

  }

  ngOnDestroy() {
    if (this.resendInterval) {
      clearInterval(this.resendInterval);
    }
  }

  ngOnInit() {
    this.thebankName();
  }

  onContinue() {
    if (this.bank.valid) {
      this.router.navigate(['/submit']);
    }
  }

}
