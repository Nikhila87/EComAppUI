import { Component, OnInit } from '@angular/core';
import { AddressService } from '../services/address.service';
import { Address } from '../models/address.model';
import { getUsernameFromToken } from '../token_helper';

import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-addresslist',
  templateUrl: './addresslist.component.html',
  styleUrls: ['./addresslist.component.css']
})
export class AddresslistComponent implements OnInit {
  editingIndex: number | null = null;
  addresses:Address[]=[];
  username: any;
editingAddress: Address= {
  fullName: '',
  street: '',
  city: '',
  state: '',
  country: '',
  zipCode: '',
  id: 0,
  IsDefault: false
};
editedAddress: Address = {
  fullName: '',
  street: '',
  city: '',
  state: '',
  country: '',
  zipCode: '',
  id: 0,
  IsDefault: false
};
// editedAddress: Address = {} as Address;
editAddress(index: number,address: Address) {
    this.editingIndex = index;
  this.editingAddress = { ...address}; // create a copy for editing
}
  constructor(private addressService:AddressService,private toastService:ToastService) { }

  ngOnInit(): void {
       this.username = getUsernameFromToken();

     this.addressService.getUserAddresses(this.username).subscribe({
  next: (res) => {
    this.addresses = res;
    console.log('Addresses loaded:', res);
  },
  error: (err) => {
    console.error('Failed to load addresses:', err);
  }
});
 this.addressService.refreshList$.subscribe(() => {
    this.loadAddresses(); // reloads the addresses list
  });
  }
  loadAddresses() {
  this.addressService.getUserAddresses(this.username).subscribe(data => {
    this.addresses = data;
  });
}
deleteAddress(id: number) {
  if (confirm('Are you sure you want to delete this address?')) {
    this.addressService.deleteAddress(id).subscribe({
      next: (res) => {
     
       
        this.addressService.getUserAddresses(this.username).subscribe({
          next: (addresses) => {
            this.toastService.show('Address deleted Successfully','success');
        this.addresses = addresses;  // update the list after delete
      },
      error: (err) => {
        console.error('Failed to reload addresses:', err);
      }
    });
  },
      error: err => {console.error('Error deleting address:', err);
         this.toastService.show('Error deleting address','error');
      }
    });
  }
}

cancelEdit() {
  // this.editingAddress = null;
    this.editingIndex = null;
}

updateAddress(index: number) {
  if (!this.editingAddress) return;

  this.addressService.updateAddress(this.editingAddress.id, this.editingAddress).subscribe({
    next: updated => {
      this.toastService.show('Address updated Successfully','success');

      // Replace the updated address in the list
      const index = this.addresses.findIndex(addr => addr.id === updated.id);
      if (index > -1) this.addresses[index] = updated;
      // this.editingAddress = null;
      //  this.addresses[index] = { ...this.editedAddress };
  this.editingIndex = null;
    },
    error: err =>{ console.error('Error updating address:', err);
       this.toastService.show('Error while updating','error');}
  });
}

}
