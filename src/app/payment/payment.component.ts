import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { CheckoutService } from '../services/checkout.service';
import { Address } from '../models/address.model';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  totalAmount = 100; // Sample amount
  shippingAddress!: Address;
  
  constructor(private paymentService: PaymentService,private checkoutService: CheckoutService) {}

  ngOnInit() {
   
    this.totalAmount = this.checkoutService.totalAmount;
    this.shippingAddress = this.checkoutService.shippingAddress;
    
  }

  checkout() {
    this.paymentService.createCheckoutSession(this.totalAmount,this.shippingAddress).subscribe((res: { sessionUrl: string; }) => {
      window.location.href = res.sessionUrl;
    });
    
  }

}
