import { Product } from '../Interfaces/Product';

export interface Cart {
    amount: number
    
    // products: {
    //     [key: string]: {
    //         product: Product;
    //         amount: number;
    //     }
    // }
}

export interface State {
    products: Product[];
    cart: Cart;
}
