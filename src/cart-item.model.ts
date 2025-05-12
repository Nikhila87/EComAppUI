import { Products } from ;

export interface CartItem {
  id: number;
  userId: string;
  productId: number;
  product: Products;
  quantity: number;
}
