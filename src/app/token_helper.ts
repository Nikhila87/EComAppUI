import {jwtDecode} from 'jwt-decode';

export interface JwtPayload {
  unique_name?: string; // For .NET Identity
  name?: string;        // Sometimes just 'name'
  email?: string;
  [key: string]: any;
}

export function getUsernameFromToken(): string | null {
  const token = localStorage.getItem('jwtToken');

  // or sessionStorage
  if (!token) return null;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
//    alert( decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);
//     alert("uniquename"+ decoded.name)
    return decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || decoded.name || null;
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
}
