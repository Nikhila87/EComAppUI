import { Component, OnInit } from '@angular/core';
import { ProductService,Products } from '../services/product.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  selectedProduct:Products= {id:0,name: '', description: '', price: 0, imageUrl: '',images:[],averageratings:0 };;
  products:any[]=[];
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
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
  selectProduct(product: Products) {
    this.selectedProduct = { ...product }; // Create a copy to avoid direct mutation
  }
  editProduct(product: Products) {
    this.productService.updateProduct(product).subscribe(()=>{
  
      this.productService.getProducts().subscribe({
        next: (data) => {
          this.products = data; 
          
        },
        error: (err) => {
          console.error('Error fetching products:', err);
        }
      });
      // this.newProduct = { id: 0, name: '', description: '', price: 0, imageUrl: '' }; 
      // /this.newProduct = { id:0,name: '', description: '', price: 0, imageUrl: '' };
      
  });
  }
}
