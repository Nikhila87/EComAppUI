import { Component, HostListener, Input, OnInit } from '@angular/core';
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
  newProduct: Products = {id:0,name: '', description: '', price: 0, imageUrl: '',images:[],averageratings:0 };
cartCount=0;

@Input() searchResults: Products[] = [];
@Input() isSearchActive: boolean = false;  
  products: Products[] = [];
  allProducts: Products[] = []; 
  @Input() searchText: string = '';
 page: number = 1;
  pageSize: number = 8;  // Adjust the page size as needed
  totalProducts: number = 0;  // Total number of products in the database
  loading: boolean = false;
  endofproducts:boolean=false;
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

   
//Pagination
  //  loadAllProducts() {
  //   this.productService.getProducts().subscribe(products => {
  //     // this.products = products;
  //     this.allProducts = products;
  //     this.totalProducts = products.length;  
  //     this.updatePagedProducts();
  //   });
  // }
  //Scrolling
  loadAllProducts() {
    this.loading = true;
    this.productService.getProducts().subscribe(products => {
    
      this.products = products;
      this.allProducts=products
        this.products = this.allProducts.slice(0, this.pageSize);
      this.loading = false;
    });
  }
  updatePagedProducts() {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.products =this.allProducts.slice(start, end);  
  }
  onSortChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
  switch (selectedValue) {
    case 'nameAsc':
      this.products.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'nameDesc':
      this.products.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'priceAsc':
      this.products.sort((a, b) => a.price - b.price);
      break;
    case 'priceDesc':
      this.products.sort((a, b) => b.price - a.price);
      break;
    default:
      // Optionally reload original list if needed
      break;
  }
}
//Pagination code
// loadNextPage() {
//   if ((this.page * this.pageSize) < this.totalProducts) {
//     this.page++;
//     this.updatePagedProducts();  
//   }
// }w
//infine scrolling code
loadNextPage() {
  if (this.loading) return;

  this.loading = true;
  setTimeout(() => {
    this.pageSize += 10;
  this.productService.getProducts().subscribe(products => {
    this.products = [...products];
    this.loading = false;
  });
},4000);
}
@HostListener("window:scroll", [])
  onScroll(): void {
    const threshold = 300; // Distance from bottom to trigger
    const position = window.innerHeight + window.scrollY;
    const height = document.body.scrollHeight;

    if (position > height - threshold && this.products.length < this.allProducts.length) {
      this.loadNextPage();
    }
    else{
      this.endofproducts=true;
    }
  }
loadPreviousPage() {
  if (this.page > 1) {
    this.page--;
    this.updatePagedProducts();  
  }
}
getStars(rating: number): number[] {
  // alert(rating);
  return Array(Math.round(rating)).fill(0);
}
addToCart(product: any) {
  this.cartService.refreshCartCount();
  this.cartService.addToCart(product);
  this.cartService.refreshCartCount();
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

