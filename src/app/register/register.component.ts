import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService,RegisterModel } from '../services/auth.service'; // Create this service to handle registration
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
// import { RegisterModel } from '../services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
form = new FormGroup({
  userName: new FormControl('', [Validators.required]),
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$')
  ]),
  confirmPassword: new FormControl('', { validators: [Validators.required] })
}, { validators: passwordMatchValidator});
  registerModel:RegisterModel={userName:' ',email:' ',password:' ',confirmPassword:' '}

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
 
    // if (this.registerModel.password !== this.registerModel.confirmPassword) {
    //   alert("Passwords do not match!");
    //   return;
    // }

    this.authService.register(this.form.value).subscribe(
      {
        next: (response) => {
          console.log('Registration Response:', response);
          // You can do something with the response, like showing a success message
          alert('Registration successful!');
          this.router.navigate(['/login']);  // Navigate to login page after successful registration
        },
        error: (err) => {
          // Handle errors here
          console.error('Registration failed:', err);
        //   if (err.status === 400) {
        //     alert(err.error.error || "Username already taken. Try a different username.");
    
        // }
          // alert('Registration failed! Please tryaaaaa again.');
        }
      }
    );
    
      //   next: (response) =>{

        
      //   alert('Registration successful!');
      //   this.router.navigate(['/login']);
      // },
      // error => {
      //   alert('Registration failed! Please try again.');
      }
     
  
}
export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (password !== confirmPassword) {
    return { passwordMismatch: true };
  }
  return null;
}