import { Component, OnInit } from '@angular/core';
import { ProductService,Products } from '../services/product.service';
// import { Products } from '../../models/product.model';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})


export class ProductComponent implements OnInit {
  products:any[]=[];
  newProduct: Products = {id:0,name: '', description: '', price: 0, imageUrl: '',images:[] };
cartCount=0;
  constructor(private productService:ProductService,public authService:AuthService,public cartService:CartService){}
  
  ngOnInit(): void {
 
    
    this.cartService.refreshCartCount();
    this.cartService.viewCart().subscribe(items => {
      this.cartService.updateCartCount(items.length); // 👈 update count with real backend data
    this.cartCount=items.length;
    });
      this.productService.getProducts().subscribe({
        next: (data) => {
          console.log('Products:', data);
          this.products= data;
        },
        error: (err) => {
          console.error('Error fetching productsss:', err);
        }
      });
    }









  }
  
//   list = ['Apple', 'Mango', 'Orange'];
//   products=[
//     {name:'Laptop',price:50000,details:'LENOVO'},
//     {name:'Tablet',price:25000,details:'IPAD'},
//     {name:'Phone',price:10000,details:'IPHONE'}
//   ];
// showDetails=false;
// toggleDetails()
// {
//   this.showDetails=!this.showDetails;
// }

