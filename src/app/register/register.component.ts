import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService,RegisterModel } from '../services/auth.service'; // Create this service to handle registration
// import { RegisterModel } from '../services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  registerModel:RegisterModel={userName:' ',email:' ',password:' ',confirmPassword:' '}

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
 
    if (this.registerModel.password !== this.registerModel.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    this.authService.register(this.registerModel).subscribe(
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
          if (err.status === 400) {
            alert(err.error.error || "Username already taken. Try a different username.");
    
        }
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
