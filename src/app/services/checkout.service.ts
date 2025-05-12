import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private _totalAmount: number = 0;
  private _shippingAddress: any = '';

  setCheckoutDetails(amount: number, address: any) {
    
    this._totalAmount = amount;
    this._shippingAddress = address;
    
  }

  get totalAmount() {
    return this._totalAmount;
  }

  get shippingAddress() {
    return this._shippingAddress;
  }
}
