import { ProductsList } from './Components/ProductsList';

export class App {
    private productsList: ProductsList;

    constructor() {
        this.productsList = new ProductsList();
    }

    render() {
        return `
        <h1>App Online Store</h1>
        <div>${this.productsList.render()}</div>
        `;
    }
}
