import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReviewService } from '../services/review.service';
import { Order } from '../models/order.model';
import { OrderService } from '../services/order.service';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders:Order[] = []; // fetched from API
  stars = [1, 2, 3, 4, 5];
  review = { userId:'',comment: '', rating: 0, productId: 0 };
  // @ViewChild('reviewModal') reviewModal: any;
    showModal = false;

  constructor(private modalService: NgbModal, private reviewService: ReviewService,private orderService:OrderService) {}
  ngOnInit(): void {
    this.orderService.getMyOrders().subscribe((orders:any) => {
    
    //  console.log('may 11'+orders)
      this.orders = orders;
     
    });
    // throw new Error('Method not implemented.');
  }

setRating(rating: number) {
  this.review.rating = rating;
}
  openReviewModal(order: any) {
    
    this.review = { userId:'',comment: '', rating: 0, productId: order };
    // this.modalService.open(this.reviewModal, { backdrop: 'static', centered: true });
      this.showModal = true;
  }

  submitReview() {
   
    this.reviewService.addReview(this.review).subscribe(() => {
      // modal.close();
         this.closeCustomModal();
      alert('Review submitted successfully!');
    });
  }
  
  closeCustomModal() {
    this.showModal = false;
  }
}


