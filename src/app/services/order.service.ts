import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  // private apiUrl = "https://localhost:5001/api/Order";
  private apiUrl = "https://ecom-api-test-e5g9ccfwfjdufyh8.southeastasia-01.azurewebsites.net/api/Order";
  constructor(private http:HttpClient) { }
  getMyOrders()
  {
         const token = localStorage.getItem('jwtToken'); // ✅ Get Token
     
            const headers = new HttpHeaders({
              Authorization: `Bearer ${token}`
            });
           
    return this.http.get(`${this.apiUrl}/my-orders`,{headers})
  }
}
