import { Component, OnInit } from '@angular/core';
import { AddressService } from '../services/address.service';
import { Address } from '../models/address.model';
import { getUsernameFromToken } from '../token_helper';

@Component({
  selector: 'app-addresslist',
  templateUrl: './addresslist.component.html',
  styleUrls: ['./addresslist.component.css']
})
export class AddresslistComponent implements OnInit {
  addresses:Address[]=[];
  username: any;

  constructor(private addressService:AddressService) { }

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
  }
deleteAddress(id: number) {
  if (confirm('Are you sure you want to delete this address?')) {
    this.addressService.deleteAddress(id).subscribe({
      next: (res) => {
     
       
        this.addressService.getUserAddresses(this.username).subscribe({
          next: (addresses) => {
        this.addresses = addresses;  // update the list after delete
      },
      error: (err) => {
        console.error('Failed to reload addresses:', err);
      }
    });
  },
      error: err => console.error('Error deleting address:', err)
    });
  }
}

}
