import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { CartService } from './services/cart.service';
import { count } from 'rxjs';
import { Products, ProductService } from './services/product.service';

import { ToastService } from './services/toast.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  searchText = '';
  cartCount = 0;
  filteredProducts: Products[] = [];
  isSearching: boolean = false; 
  products: any;
  searchResults='';
   toastMessage: string | null = null;
  toastType: string = 'info';
  // constructor(public authService: AuthService,public router: Router,private cartService: CartService,private productService: ProductService,private toastService: ToastService) {}
   constructor(public authService: AuthService,public router: Router,private cartService: CartService,private productService: ProductService,private toastService: ToastService) {
    this.toastService.toast$.subscribe((data: { message: string | null; type: string; }) => {
      this.toastMessage = data.message;
      this.toastType = data.type;

      setTimeout(() => {
        this.toastMessage = null;
      }, 3000); // Auto hide in 3 seconds
    });
  }

  title = 'EComApp';

  ngOnInit() {
    
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    
    // this.cartService.viewCart().subscribe(items => {
    //   this.cartService.updateCartCount(items.length); 
    // this.cartCount=items.length;
    });

    this.cartService.refreshCartCount();
    
  }
  onSearch() {
    const trimmed = this.searchText.trim();
    if (trimmed) {
      this.router.navigate(['/search', trimmed]);
    } else {
      this.router.navigate(['/']);
    }
  }
  

  
  
}
