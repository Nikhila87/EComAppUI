import { Address } from "./address.model";
import { CartItem } from "./cart-item.model";

// order.model.ts
export interface Order {
    orderId?: number;
    userId?: string;
 
    totalAmount: number;
    shippingAddress: Address;
    paymentStatus: string;
    transactionId: string;
    createdAt: string;
    items: OrderItem[];
  }
  export interface OrderItem {
    productId: number;
    productName: string;
    imageUrl: string;
    quantity: number;
    price: number;
  }