import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];
  // private cartCountSubject = new BehaviorSubject<number>(this.getSavedCartCount());
  private apiUrl = 'https://ecom-api-test-e5g9ccfwfjdufyh8.southeastasia-01.azurewebsites.net/api/Cart'; // 🔁 Update if needed
  // cartCount$ = this.cartCountSubject.asObservable();
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();
  constructor(private http: HttpClient) {
    // this.loadCartFromStorage();
  }

  public loadCartFromStorage() {
    try {
      const storedCart = localStorage.getItem('cart');
      this.cartItems = storedCart ? JSON.parse(storedCart) : [];
    } catch (e) {
      console.error('Failed to parse cart from localStorage:', e);
      this.cartItems = [];
    }
    this.cartCountSubject.next(this.cartItems.length);
  }

  private getSavedCartCount(): number {
    try {
      const storedCart = localStorage.getItem('cart');
      return storedCart ? JSON.parse(storedCart).length : 0;
    } catch (e) {
      console.error('Failed to parse cart count:', e);
      return 0;
    }
  }

  addToCart(product: any) {
    const token = localStorage.getItem('jwtToken'); // ✅ Get Token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    const payload = {
      productId: product.id,
      quantity: 1
    };
    const userdetails = {
      username:"Nikhila",
      password: "Nikki@123"
    };
    return this.http.post<CartItem>(`${this.apiUrl}`, payload, { headers }).subscribe(response => {
      this.cartItems.push(response); // ✅ Optional: if you want to reflect updated cart
      this.cartCountSubject.next(this.cartItems.length);
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    }, error => {
      console.error('Error adding to cart:', error);
    });
  }
  

  // getCartItems() {
  //   return this.cartItems;
  // }

  // getCartItems(): Observable<CartItem[]> {
  //   const token = localStorage.getItem('jwtToken');
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`
  //   });
  
  //   return this.http.get<CartItem[]>(`${this.apiUrl}/user`, { headers });
  // }
  viewCart(): Observable<CartItem[]> {
    const token = localStorage.getItem('jwtToken'); // ✅ Get Token
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}` // ✅ Attach token
        });
        
    // alert(`${this.apiUrl}/user`);
    return this.http.get<CartItem[]>(`${this.apiUrl}/user`,{headers});
    
  }

  updateCartItem(item: any): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.put(`${this.apiUrl}/update`, item, { headers });
  }
 



  


  // Delete from cart method (we'll use later if needed)
  deleteCartItem(id: number) {
    const token = localStorage.getItem('jwtToken'); // ✅ Get Token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
     }); // ✅ Attach token
  
    // return this.http.delete(`${this.apiUrl}/${id}`,{headers});
    return this.http.delete(this.apiUrl+"/"+id,{headers});
  }

  updateCartCount(count: number) {
    this.cartCountSubject.next(count);

  }
  refreshCartCount() {
    this.viewCart().subscribe(items => {
      this.updateCartCount(items.length);
     
    });
  }
}
