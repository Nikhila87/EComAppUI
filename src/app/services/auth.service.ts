import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import {jwtDecode} from 'jwt-decode';
import { CartService } from './cart.service';

export interface RegisterModel {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://ecom-api-test-e5g9ccfwfjdufyh8.southeastasia-01.azurewebsites.net/api/auth'; //azure url
  //  private apiUrl = "https://localhost:5001/api/auth";
  private jwtHelper = new JwtHelperService(); 

  constructor(private http: HttpClient, private router: Router,private cartService:CartService) {}

  login(username: string, password: string): Observable<any> {
   
    this.cartService.refreshCartCount();
    
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password })
      
  }

  register(registerModel: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, registerModel);
  }

  logout() {
    localStorage.removeItem('jwtToken'); 
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('jwtToken');
    return token ? !this.jwtHelper.isTokenExpired(token) : false; 
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwtToken'); 
  }
  getUserRole(): string {
    return localStorage.getItem('userRole') || ''; // Fetch role from storage
  }
  isAdmin(): boolean {
    const userRole = localStorage.getItem('userRole'); // Assuming the role is stored in localStorage
    return userRole === 'Admin';
  }
  public setUserRoleFromToken(token: string): void {
    try {
 
      
      const decodedToken: any = jwtDecode(token); // Decode JWT
      const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || ''; // Get role from token
     
      console.log("Decode"+JSON.stringify(decodedToken));
      console.log("Role"+role);
      localStorage.setItem('userRole', role); // Store role
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }
}
