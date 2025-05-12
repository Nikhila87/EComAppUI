import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent {
  resetForm: FormGroup;
  token: string = '';
  email: string = '';
  successMessage = '';
  errorMessage = '';
  newPassword: any;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });

  }

  onSubmit() {
    
    const email = this.route.snapshot.queryParamMap.get('email') ?? '';;
    const token = this.route.snapshot.queryParamMap.get('token') ?? '';;
    const resetData = {
      newPassword: this.resetForm.value.newPassword
    };
    if (this.resetForm.valid) {
     alert(this.token+""+this.email);
      const { newPassword, confirmPassword } = this.resetForm.value;
      
      if (newPassword !== confirmPassword) {
       
        this.errorMessage = "Passwords do not match.";
        return;
      }
      const headers = new HttpHeaders().set('Content-Type', 'application/json');

      this.http.post('https://localhost:5001/api/auth/reset-password?email=' + email + '&token=' + token, 
        {newPassword: this.resetForm.value.newPassword,email:email,token:token}, { headers })
    .subscribe({
        next: () => {
         
          this.successMessage = 'Password reset successful!';
          // setTimeout(() => this.router.navigate(['/login']), 2000);
        },
        error: err => {
          console.log('Sending request with', {
            email: email,
            token: token,
            newPassword: this.resetForm.value.newPassword
          });
          alert(newPassword);
          this.errorMessage = err || 'Invalid or expired token.';
        }
      });
    }
  }
}
