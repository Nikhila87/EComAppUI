import { Component, OnInit } from '@angular/core';
import { getUsernameFromToken } from '../token_helper';
import { AddressService } from '../services/address.service';
import { Address } from '../models/address.model';
import { CheckoutService } from '../services/checkout.service';
import { ToastService } from '../services/toast.service';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private addressService:AddressService,private checkoutService: CheckoutService,private toastService:ToastService) { }

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
            next:(res)=>{ 
              this.defaultAddress=res;
             if (!this.selectedAddressId && this.defaultAddress) {
          this.selectedAddressId = this.defaultAddress.id;
        }
      },

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
     
      const selectedFromLocal = localStorage.getItem('selectedAddress');
      if (selectedFromLocal) {
        const selected = JSON.parse(selectedFromLocal);
        this.selectedAddressId = selected.id;
      } else {
        // fallback to default address
        const defaultAddr = this.addresses.find(a => a.IsDefault);
        if (defaultAddr) {
          this.selectedAddressId = defaultAddr.id;
        }
      }
    },
      error: err => console.error("API Error:", err)
    });
}
get selectedAddress() {
  return this.addresses.find(addr => addr.id === this.selectedAddressId) || null;
}
selectAddress(addressId: number) {
  this.selectedAddressId = addressId;
  const selected = this.addresses.find(a => a.id === addressId);
  if (selected) {
    localStorage.setItem('selectedAddress', JSON.stringify(selected));
  }
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

  this.addressService.setDefaultAddress(addressId).subscribe({
    next: (res) => {
     this.defaultAddress=res;
     localStorage.setItem('defaultAddress', JSON.stringify(res));
     this.toastService.show('Default address has changed', 'success');
  if (!localStorage.getItem('selectedAddress')) {
        this.selectedAddressId = res.id;
      }

      // Reload addresses after setting default
      if (this.username) {
        this.loadAddresses(this.username);

      }
 
    },
    error: err => console.error('Error setting default address:', err)
  });
}

}
