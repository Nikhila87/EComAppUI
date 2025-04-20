import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { CartService } from './services/cart.service';
import { count } from 'rxjs';
import { ProductService } from './services/product.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  cartCount = 0;
  
  products:any[]=[];
  constructor(public authService: AuthService,public router: Router,private cartService: CartService,private productService: ProductService) {}
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
  searchName: string = '';

  onSearch() {
    if (this.searchName.trim()) {
      alert(this.searchName.trim());
      this.productService.searchProductsByName(this.searchName).subscribe({
        next: (response) => {
          this.products = response;
        },
        error: (err) => {
          console.log('Error loading products:', err);
        }
      });
    }
  }
}
