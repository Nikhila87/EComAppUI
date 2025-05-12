export interface Address {
    id: number;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    fullName:string;
    IsDefault:boolean;
  }
  // export interface AddressResponse {
  //   addresses: Address[];
  // }