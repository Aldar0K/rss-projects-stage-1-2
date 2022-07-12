import { ProductsItem } from '../ProductsItem/ProductsItem';

export class ProductsList {
    private products: ProductsItem[];

    constructor() {
        this.products = [new ProductsItem(), new ProductsItem(), new ProductsItem(), new ProductsItem()];
    }

    render() {
        return `
        <h2>Products List</h2>
        ${this.products.map((product: ProductsItem) => product.render()).join('')}
        `;
    }
}
