import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

export interface Products {
 
  id:number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
images:string[]
}
@Injectable({
  providedIn: 'root'
})
export class ProductService {
// private apiUrl="http://localhost:5290/api/Products";
private apiUrl="https://ecom-api-test-e5g9ccfwfjdufyh8.southeastasia-01.azurewebsites.net/api/Products";
  constructor(private http:HttpClient) { }
  getProducts() : Observable<Products[]>
  {
    
    // const token = localStorage.getItem('jwtToken'); /
    // console.log('Token:', token); 

    // const headers = new HttpHeaders({
    //   Authorization: `Bearer ${token}` 
    // });

    return this.http.get<any>(this.apiUrl).pipe(
      map(product => {
        if (!product.images || product.images.length === 0) {
          product.images = [ 
            product.imageUrl 
            // "assets/DSC01271.jpg",
            // "assets/DSC012722.jpg"
          ];
        }
        return product;
      })
    );;
    // return this.http.get<Products[]>(this.apiUrl)
  
}


  addProduct(product: Products, files: File[] | null): Observable<Products> {
  
    const token = localStorage.getItem('jwtToken'); 
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` 
    });
   
      const formData = new FormData();
      formData.append("product", new Blob([JSON.stringify(product)], { type: "application/json" }));
      if (files) {
      files.forEach(file => {
        formData.append("files", file);
       
      });
    
    }
  
    return this.http.post<any>(this.apiUrl, product,{headers}).pipe(
      tap(() => console.log('Post request successful!')),
      catchError(error => {
       
        return throwError(error);
      })
    );
    }
  
  deleteProduct(id: number) {
   
    const token = localStorage.getItem('jwtToken'); // ✅ Get Token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // ✅ Attach token
    });

  // return this.http.delete(`${this.apiUrl}/products/${id}`);
  return this.http.delete(this.apiUrl+"/products/"+id,{headers});
}

updateProduct(product: Products): Observable<any> {
  const token = localStorage.getItem('jwtToken'); 
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  return this.http.put(`${this.apiUrl}/${product.id}`, product,{headers});
}
getProductById(id: string) {
  
  return this.http.get<Products>(`${this.apiUrl}/${id}`);
}
searchProductsByName(name: string): Observable<any> {
  alert("product name"+name);
  const params = new HttpParams().set('name', name);
 alert(`${this.apiUrl}/search?name=${name}`);
 alert(`${this.apiUrl}/search?${params}`);
  // return this.http.get<any>(`${this.apiUrl}/search`,{params});
  return this.http.get<any>(`${this.apiUrl}/?name=${name}`);
}

}
export const MOCK_PRODUCTS = [
  {
    id: 1049,
    name: "Nike Shoes",
    price: 120,
    description: "High-quality running shoes",
    images: [
      "assets/DSC01271.jpg",
      "assets/DSC01272.jpg",
      "assets/DSC01273.jpg"
    ]
  },
  {
    id: 1050,
    name: "Adidas Sneakers",
    price: 140,
    description: "Comfortable and stylish",
    images: [
      "assets/DSC01274.jpg",
      "assets/DSC01275.jpg",
      "assets/DSC01276.jpg"
    ]
  }
];
