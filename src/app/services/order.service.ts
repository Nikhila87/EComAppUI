import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = "https://localhost:5001/api/Order";
  constructor(private http:HttpClient) { }
  getMyOrders()
  {
    
    return this.http.get(`${this.apiUrl}/my-orders`)
  }
}
