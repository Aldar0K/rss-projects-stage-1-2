import { ProductsList } from './Components/ProductsList/ProductsList';
// import { AppComponent } from './Interfaces/AppComponent';

// export class App implements AppComponent {
export class App {
    private productsList: ProductsList;

    constructor() {
        this.productsList = new ProductsList();
    }

    render() {
        return this.productsList.render();
    }
}
