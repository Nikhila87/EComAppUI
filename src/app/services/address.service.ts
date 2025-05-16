import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Address } from '../models/address.model';
@Injectable({
  providedIn: 'root'
})
export class AddressService {
  // private baseUrl = "https://localhost:5001/api/Address";
  private baseUrl ="https://ecom-api-test-e5g9ccfwfjdufyh8.southeastasia-01.azurewebsites.net/api/Address";
   private refreshListSubject = new Subject<void>();
  refreshList$ = this.refreshListSubject.asObservable();

  triggerRefresh() {
    this.refreshListSubject.next();
  }
  constructor(private http: HttpClient) {}

  getUserAddresses(user:string): Observable<Address[]> {

    return this.http.get<Address[]>(`${this.baseUrl}/get/${user}`);
  }

  addAddress(address: Address): Observable<Address> {

     const token = localStorage.getItem('jwtToken');
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
         });
    
         
    return this.http.post<Address>(this.baseUrl+'/address/', address,{headers});
  }
  setDefaultAddress(addressId: number) {
    
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
     });
  
     return this.http.put<Address>(this.baseUrl+'/defaultaddr/'+addressId, null,{headers});
  
  }
  getDefaultAddress(username: string): Observable<Address> {
    
    return this.http.get<Address>(`${this.baseUrl}/default/${username}`);
  }
  deleteAddress(id: number): Observable<any> {
  
      const token = localStorage.getItem('jwtToken');
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
         });
  return this.http.delete(`${this.baseUrl}/${id}`,{headers});
}
updateAddress(id: number, address: Address) {
      const token = localStorage.getItem('jwtToken');
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
         });
  return this.http.put<Address>(`${this.baseUrl}/${id}`, address,{headers});
}
}
