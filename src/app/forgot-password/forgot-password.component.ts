import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {
  forgotForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  resetLink: any;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgotForm.valid) {
      
      this.http.post('https://localhost:5001/api/auth/forgot-password', this.forgotForm.value)
        .subscribe({
          next: (res: any) => {
            console.log(res.resetLink);
            this.resetLink = res.resetLink;
            this.successMessage = 'Reset link sent to your email (or check backend console if in dev).';
          },
          error: err => {
            this.errorMessage = err.error || 'Something went wrong!';
          }
        });
    }
  }
}
