import { ProductsList } from './Components/ProductsList/ProductsList';
import { Cart } from './Components/Cart/Cart';
import { AppStore } from './Store/AppStore';

export class App {
    public productsList: ProductsList;
    public cart: Cart;

    constructor() {
        let amount = 0;
        let productsIds: number[] = [];
        const load = localStorage.getItem('appStore');
        if (load) {
            const parsedLoad: AppStore = JSON.parse(load);
            amount = parsedLoad.state.cart.amount;
            productsIds = parsedLoad.state.cart.productsIds;
        }

        this.cart = new Cart(amount, productsIds);
        this.productsList = new ProductsList();
    }

    start(): void {
        const productsContainer = document.querySelector('.main__products') as HTMLDivElement;
        productsContainer.innerHTML = this.productsList.render();

        const cartContainer = document.querySelector('.main__cart') as HTMLDListElement;
        cartContainer.innerHTML = this.cart.render();
    }

    cartUpdate(id: number): void {
        this.cart.update(id);
    }
}

export const app = new App();
