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
      
      this.http.post('https://ecom-api-test-e5g9ccfwfjdufyh8.southeastasia-01.azurewebsites.net/api/auth/forgot-password', this.forgotForm.value)
        .subscribe({
          next: (res: any) => {
            console.log(res.resetLink);
            this.resetLink = res.resetLink;
            this.successMessage=res.message;
          },
          error: err => {
            this.errorMessage = err.error?.message|| 'Something went wrong!';
          }
        });
    }
  }
}
