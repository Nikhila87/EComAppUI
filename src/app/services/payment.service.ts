import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Address } from '../models/address.model';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl = 'https://localhost:5001/api/payment';
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
    return this.http.post<{ sessionUrl: string }>(`${this.baseUrl}/payment`, requestBody);
  }
  getOrderBySessionId(sessionId: string): Observable<any> {
    return this.http.get(`https://localhost:5001/api/payment/order/${sessionId}`);
  }
}
