import { ProductsList } from './Components/ProductsList/ProductsList';
import { Cart } from './Components/Cart/Cart';
// import { AppComponent } from './Interfaces/AppComponent';

// export class App implements AppComponent {
export class App {
    private productsList: ProductsList;
    private cart: Cart;

    constructor() {
        this.productsList = new ProductsList();
        this.cart = new Cart();
    }

    start() {
        (document.querySelector('.main__products') as HTMLDivElement).innerHTML = this.productsList.render();
        (document.querySelector('.main__cart') as HTMLDListElement).innerHTML = this.cart.render();

        // this.cart.addEvents();
        // this.productsList.addEvents();
    }

    cartUpdate(value: boolean) {
        this.cart.update(value);
    }
}

export const app = new App();
