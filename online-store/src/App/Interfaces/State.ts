import { Product } from './Product';

export interface Cart {
    amount: number;
}

export interface State {
    products: Product[];
    cart: Cart;
}
