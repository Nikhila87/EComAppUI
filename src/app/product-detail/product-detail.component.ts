import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService} from '../services/product.service';
import { ReviewService } from '../services/review.service';
import { MOCK_PRODUCTS } from '../MockProducts';
import { Review } from '../models/review.model'; // adjust path

import { CartService } from '../services/cart.service';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: any;

  currentImageIndex: number = 0;
  defaultImage: string = 'assets/DSC01271.jpg'; 
  newReview: Review = {
    productId: 0, // set it in ngOnInit
    userId: '',
    rating: 0,
    comment: ''
  };
  reviews: Review[] = [];
 

  constructor(private route: ActivatedRoute, private productService: ProductService,private cartService: CartService,private reviewService:ReviewService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(id).subscribe((data) => {
        this.product = data;
  
      
        if (this.product.imageUrl) {
          this.product.images = this.product.imageUrl.split(',').map((img:string) => img.trim()); // Convert to array
        } else {
          this.product.images = [this.defaultImage]; // Fallback image
        }
      }, (error) => {
        console.error("Error fetching product:", error);
        this.product = { images: [this.defaultImage] }; // Fallback on error
      });
    }
    const rid = this.route.snapshot.params['id'];

    this.newReview.productId = rid;
    this.loadReviews(rid);

  }
 
  submitReview() {
    this.reviewService.addReview(this.newReview).subscribe(() => {
      this.newReview = { productId: this.newReview.productId, userId: '', rating: 0, comment: '' };

      this.loadReviews(this.newReview.productId);
    });
  }
  
  loadReviews(productId: number) {
    this.reviewService.getReviews(productId).subscribe(data => {

      this.reviews = data;
    });
  }
  nextImage(): void {
    if (this.product?.images?.length) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.product.images.length;
    }
  }

  prevImage(): void {
    if (this.product?.images?.length) {
      this.currentImageIndex = 
        (this.currentImageIndex - 1 + this.product.images.length) % this.product.images.length;
    }
  }


  addToCart(product: any) {
    // this.cartService.refreshCartCount();
    this.cartService.addToCart(product);
    this.cartService.refreshCartCount();
  }


}
  

