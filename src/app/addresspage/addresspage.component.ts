import { Component, OnInit } from '@angular/core';
import { getUsernameFromToken } from '../token_helper';
import { AddressService } from '../services/address.service';
import { Address } from '../models/address.model';
import { CheckoutService } from '../services/checkout.service';
// import { UseraddressComponent } from '../useraddress/useraddress.component';

@Component({
  selector: 'app-addresspage',
  templateUrl: './addresspage.component.html',
  styleUrls: ['./addresspage.component.css']
})
export class AddresspageComponent implements OnInit {
  username: string | null = null
  addresses:Address[]=[];
  selectedAddressId: number | undefined;
  showAddressList = false;
  defaultAddress!: Address;

  constructor(private addressService:AddressService,private checkoutService: CheckoutService) { }

  ngOnInit(): void {
     this.username = getUsernameFromToken();
     ;
  //    const defaultAddress = this.addresses.find(addr => addr.IsDefault);
  //    alert(defaultAddress?.fullName)
  // if (defaultAddress) {
  //   this.selectedAddressId = defaultAddress.id;
  // }
        if (this.username) {
          this.loadAddresses(this.username);
          this.addressService.getDefaultAddress(this.username).subscribe({
          
            next:(res)=>
             
            { this.defaultAddress=res,this.selectedAddressId = this.defaultAddress.id;},
            error:(err)=>console.error(err)
          });
        }
        else {
          console.warn("Username is null or undefined.");

  }

  }

  loadAddresses(username:string) {
  
    this.addressService.getUserAddresses(username).subscribe({
    
      next: res => {
       
        console.log("API response:", res);
        this.addresses = res; 
     
      },
      error: err => console.error("API Error:", err)
    });
}
get selectedAddress() {
  return this.addresses.find(addr => addr.id === this.selectedAddressId) || null;
}

proceedToPaymentPage() {
  const currentAmount = this.checkoutService.totalAmount;
  const selectedAddress = this.addresses.find(addr => addr.id === this.selectedAddressId);

    if (!selectedAddress) {
      alert('Please select a valid address.');
      return;
    }


  this.checkoutService.setCheckoutDetails(currentAmount, selectedAddress);
  // this.router.navigate(['/payment']);
}
setAsDefault(addressId: number) {
alert(addressId)
  this.addressService.setDefaultAddress(addressId).subscribe({
    next: (res) => {
     this.defaultAddress=res;
      // Reload addresses after setting default
      if (this.username) {
        this.loadAddresses(this.username);
      }
    },
    error: err => console.error('Error setting default address:', err)
  });
}

}
