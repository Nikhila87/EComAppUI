import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
products:any[]=[];
  constructor(private productService:ProductService,public authService:AuthService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        // console.log('Products:', data);
        this.products= data;
   
      },
      error: (err) => {
        console.error('Error fetching productsss:', err);
      }
    });
  }
deleteProduct(productId: number) {

  this.productService.deleteProduct(productId).subscribe(() => {
    this.products = this.products.filter(p => p.id !== productId); 
    alert("deleted");// Remove from list
  });
}
}
