import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CartItem } from '../models/cart-item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {

    this.loadCart();
  this.cartService.refreshCartCount();
    this.cartService.viewCart().subscribe({
      next: (data) => {
        // console.log('Products:', data);
        this.cartItems= data;
      },
      error: (err) => {
        console.error('Error fetching productsss:', err);
      }
      
    });
   
  }

  loadCart(): void {
    this.cartService.viewCart().subscribe({
      next: (items) => {
        this.cartItems = items;
        this.calculateTotal();
     
        
      },
      error: (err) => console.error('Error fetching cart:', err)
    });
  }

  calculateTotal(): void {
    this.totalPrice = this.cartItems.reduce((sum, item) => {
   alert("product price");
      return sum + (item.product.price * item.quantity);
    }, 0);
  }

  deleteItem(id: number): void {
    this.cartService.deleteCartItem(id).subscribe(() => {
      this.cartItems = this.cartItems.filter(item => item.id !== id);
      
      this.calculateTotal();
      this.cartService.refreshCartCount();
    });
  }

  increaseQuantity(item: any) {
    item.quantity++;
    this.updateCartItem(item);
    this.calculateTotal();
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateCartItem(item);
      this.calculateTotal();
    }
  }
  updateCartItem(item: any) {
    this.cartService.updateCartItem(item).subscribe(
      () => this.loadCart(),
      (error) => console.error('Update failed:', error)
    );
  }
}
