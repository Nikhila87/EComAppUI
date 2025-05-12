// success.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../services/payment.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html'
})
export class SuccessComponent implements OnInit {
  orderDetails: any;
  sessionId: string | null = null;
  cartItems: never[] = [];

  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentService,private cartService:CartService
  ) {}

  ngOnInit() {
    
    this.sessionId = this.route.snapshot.queryParamMap.get('session_id');
    

    if (this.sessionId) {
      this.paymentService.getOrderBySessionId(this.sessionId)
      .subscribe({
        next: (res: any) => this.orderDetails = res,
        error: (err: any) => console.error('Failed to fetch order details', err)
      });
    }
    this.cartService.clearCart().subscribe(() => {
      this.cartItems = [];
      this.cartService.refreshCartCount();
    }); 
  
  }
}
