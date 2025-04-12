import { Products } from '../services/product.service';

export interface CartItem {
  id: number;
  userId: string;
  productId: number;
  product: Products;
  quantity: number;
}
