import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../models/review.model';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private apiUrl = 'https://localhost:5001/api/ProductReview';
 private baseUrl = 'https://ecom-api-test-e5g9ccfwfjdufyh8.southeastasia-01.azurewebsites.net//api/ProductReview';
  constructor(private http: HttpClient) {}

  getReviews(productId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/${productId}`);
  }

  addReview(review: Review): Observable<any> {
     const token = localStorage.getItem('jwtToken'); // ✅ Get Token
     alert(token);
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
       
        console.log('Review being posted:', review);
    return this.http.post(this.apiUrl, review,{headers});
  }
}