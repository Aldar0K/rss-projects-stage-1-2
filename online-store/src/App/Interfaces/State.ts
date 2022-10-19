import { Product } from './Product';

interface Cart {
  amount: number;
  productsIds: number[];
}

export interface State {
  products: Product[];
  cart: Cart;
}
