import { ProductsList } from './Components/ProductsList/ProductsList';
import { Cart } from './Components/Cart/Cart';
import { AppStore } from './Store/AppStore';

export class App {
    public productsList: ProductsList;
    private cart: Cart;

    constructor() {
        const load = localStorage.getItem('appStore');
        let amount = 0;
        if (load) {
            const parsedLoad: AppStore = JSON.parse(load);
            amount = parsedLoad.state.cart.amount;
        }

        this.productsList = new ProductsList();
        this.cart = new Cart(amount);
    }

    start() {
        const productsContainer = document.querySelector('.main__products') as HTMLDivElement;
        productsContainer.innerHTML = this.productsList.render();

        const cartContainer = document.querySelector('.main__cart') as HTMLDListElement;
        cartContainer.innerHTML = this.cart.render();
    }

    cartUpdate(value: boolean) {
        this.cart.update(value);
    }
}

export const app = new App();
