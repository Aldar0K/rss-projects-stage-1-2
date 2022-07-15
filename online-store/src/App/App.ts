import { ProductsList } from './Components/ProductsList/ProductsList';

export class App {
    private productsList: ProductsList;

    constructor() {
        this.productsList = new ProductsList();
    }

    render() {
        return this.productsList.render();
    }
}
