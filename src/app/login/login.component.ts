import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage: string | undefined;
  constructor(public authService: AuthService,private router: Router,private cartService:CartService) {}
cartCount=0;
  login() {
    this.cartService.refreshCartCount();
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    
    // this.cartService.viewCart().subscribe(items => {
    //   this.cartService.updateCartCount(items.length); 
    // this.cartCount=items.length;
    // });
    });
    
    
   
   
    this.authService.login(this.username, this.password).subscribe({
            next: (data) => {
              console.log("Token received:", data.token);
              localStorage.setItem('jwtToken', data.token); 
              this.cartService.refreshCartCount();
              
              this.router.navigate(['/product']);
      
        this.authService.setUserRoleFromToken(`${data.token}`);
            },
            error: (err) => {
              if (err.status === 401) {
                this.errorMessage = 'Invalid username or password';
              } else {
                this.errorMessage = 'An error occurred. Please try again.';
              }
              // alert('Login failed:');
            }
          });


  }
}
