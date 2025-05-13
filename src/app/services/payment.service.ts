import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Address } from '../models/address.model';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  // private baseUrl = 'https://localhost:5001/api/payment';
   private baseUrl = 'https://ecom-api-test-e5g9ccfwfjdufyh8.southeastasia-01.azurewebsites.net/api/payment';
  shippingAddress = {
 
    fullName: '',
    street: '',
    city: '',
    zipCode: '',
    country: ''
  };

  constructor(private http: HttpClient) {}
  
  createCheckoutSession(amount: number, shippingAddress: Address) {
    const requestBody = {
      totalAmount: amount,
      shippingAddress: shippingAddress  
    };
        const token = localStorage.getItem('jwtToken');
            const headers = new HttpHeaders({
              Authorization: `Bearer ${token}` 
            });
    return this.http.post<{ sessionUrl: string }>(`${this.baseUrl}/payment`, requestBody,{headers});
  }
  getOrderBySessionId(sessionId: string): Observable<any> {
    return this.http.get(`https://ecom-api-test-e5g9ccfwfjdufyh8.southeastasia-01.azurewebsites.net/api/payment/order/${sessionId}`);
  }
}
