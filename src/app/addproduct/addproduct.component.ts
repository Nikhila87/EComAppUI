import { Component, OnInit } from '@angular/core';
import { ProductService,Products } from '../services/product.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  products:any[]=[];
  newProduct: Products = {id:0,name: '', description: '', price: 0, imageUrl: '', images: [] };
  selectedFile: File[] | null = null;
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    
  }

  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;

    const file = event.target as HTMLInputElement; // Get the selected file
    if (file.files) {
      this.selectedFile = Array.from(file.files);  // Store the file
     
      // this.newProduct.imageUrl = file.name; // Store filename as image URL (optional)
    }
  }
addProduct() {
 
  // if (this.selectedFile) {
  //   this.newProduct.imageUrl ="assets/"+this.selectedFile.name;
  // }
  if (this.selectedFile && this.selectedFile.length > 0) {
    // this.newProduct.imageUrl = this.selectedFile[0].name; // ✅ Works safely
    this.newProduct.imageUrl = this.selectedFile.map(file => file.name).join(','); 
    alert(this.newProduct.imageUrl)
  }
  else {
    this.newProduct.images = []; // Ensure it's always an array
  }
  if (this.newProduct.images && !Array.isArray(this.newProduct.images)) {
    alert(this.newProduct.images)
    this.newProduct.images = String(this.newProduct.images) // ✅ Ensure it's a string
      .split(',')
      .map((img) => img.trim())
      .filter((img) => img.length > 0);
      alert(this.newProduct.images) // ✅ Remove empty values
  } else {
    this.newProduct.images = []; // ✅ Ensure it's always an array
  }

// const fileArray = this.selectedFile ? [this.selectedFile] : null;
  this.productService.addProduct({...this.newProduct}, this.selectedFile).subscribe(() => {

    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data; 
        console.log('SUCCESS:');
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        
      }
    });
    this.newProduct = { id:0,name: '', description: '', price: 0, imageUrl:'',images:[] };
    this.selectedFile = null;
  });
}
}
