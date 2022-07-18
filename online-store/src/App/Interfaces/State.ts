import { Product } from './Product';

interface Cart {
    amount: number;
}

export interface State {
    products: Product[];
    cart: Cart;
}
