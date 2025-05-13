import { Component, OnInit } from '@angular/core';
import { AddressService } from '../services/address.service';
import { Address } from '../models/address.model';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { getUsernameFromToken } from '../token_helper';

@Component({
  selector: 'app-useraddress',
  templateUrl: './useraddress.component.html',
  styleUrls: ['./useraddress.component.css']
})
export class UseraddressComponent implements OnInit {
  username: string | null = null
  
;
  addresses: Address[] = [];
  newAddress: Address = {
    id:0,
    fullName: '',
    street: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    IsDefault:false
  };

  constructor(private addressService: AddressService,private router:Router) { }

  ngOnInit(): void {
    this.username = getUsernameFromToken();
    if (this.username) {
      this.loadAddresses(this.username);
    }
  }
  loadAddresses(username:string) {
    this.addressService.getUserAddresses(username).subscribe({
      next: res => this.addresses = res,
      error: err => console.error(err)
    });
  }

  addAddress() {
    this.addressService.addAddress(this.newAddress).subscribe({
     
      next: () => {
       
        alert("address added")
        // this.loadAddresses(); // Refresh list
        this.newAddress = { id:0,fullName: '', street: '', city: '', state: '', country: '', zipCode: '',IsDefault:false }; // Reset form
      this.router.navigate(['/addresspage']);
      },
      error: err => console.error(this.newAddress)
    });
  }
}
