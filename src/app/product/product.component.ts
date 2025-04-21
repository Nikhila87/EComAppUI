import { Component, Input, OnInit } from '@angular/core';
import { ProductService,Products } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
// import { Products } from '../../models/product.model';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})


export class ProductComponent implements OnInit {
  // products:any[]=[];
  newProduct: Products = {id:0,name: '', description: '', price: 0, imageUrl: '',images:[] };
cartCount=0;

@Input() searchResults: Products[] = [];
@Input() isSearchActive: boolean = false;  
  products: Products[] = [];
  allProducts: Products[] = []; 
  @Input() searchText: string = '';

 
  constructor(private route: ActivatedRoute,private productService:ProductService,public authService:AuthService,public cartService:CartService){}




  ngOnInit(): void {
 
    
    this.cartService.refreshCartCount();
    this.cartService.viewCart().subscribe(items => {
      this.cartService.updateCartCount(items.length); 
    this.cartCount=items.length;
    });
    this.route.paramMap.subscribe(params => {
  
      const name = params.get('name');
      if (name) {
      
        this.searchProducts(name);
      } else {
        this.loadAllProducts();
      }
    });
  
    }
    searchProducts(name: string) {
      this.productService.searchProductsByName(name).subscribe(products => {
        this.products = products;
      });
    }

   

   loadAllProducts() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
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

