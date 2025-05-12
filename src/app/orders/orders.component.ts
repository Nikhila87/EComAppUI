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
  review = { userId:'',comment: '', rating: 0, productId: 0 };
  @ViewChild('reviewModal') reviewModal: any;

  constructor(private modalService: NgbModal, private reviewService: ReviewService,private orderService:OrderService) {}
  ngOnInit(): void {
    this.orderService.getMyOrders().subscribe((orders:any) => {
    
    //  console.log('may 11'+orders)
      this.orders = orders;
     
    });
    // throw new Error('Method not implemented.');
  }

  openReviewModal(order: any) {
    
    this.review = { userId:'',comment: '', rating: 0, productId: order };
    this.modalService.open(this.reviewModal);
  }

  submitReview(modal: any) {
   
    this.reviewService.addReview(this.review).subscribe(() => {
      modal.close();
      alert('Review submitted successfully!');
    });
  }
}


