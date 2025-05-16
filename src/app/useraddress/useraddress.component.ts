import { Component, OnInit } from '@angular/core';
import { AddressService } from '../services/address.service';
import { Address } from '../models/address.model';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { getUsernameFromToken } from '../token_helper';
import { ToastrService } from 'ngx-toastr';
import { ToastService } from '../services/toast.service';

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
source: string = '';

  constructor(private addressService: AddressService,private router:Router,private toastr: ToastrService,private toastService: ToastService,private route:ActivatedRoute) { }

  ngOnInit(): void {
     this.route.queryParams.subscribe(params => {
    this.source = params['from'];
  });
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
    
          this.toastService.show('Address added', 'success');
if (this.source === 'payment') {
alert(this.source)
    this.router.navigate(['/addresspage']);
  } else {
    this.router.navigate(['/#']); // or wherever appropriate
  }
   this.addressService.triggerRefresh();
        this.newAddress = { id:0,fullName: '', street: '', city: '', state: '', country: '', zipCode: '',IsDefault:false }; // Reset form

      },
      error: err => console.error(this.newAddress)
    });
  }
}
