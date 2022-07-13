import { Product } from '../../Styles/Product';

export class ProductsItem {
    constructor(private product: Product) {}

    render() {
        return `
            <div>
                <h3>${this.product.name}</h3>
                <p><img src = "${this.product.image}" alt = "${this.product.name}"/></p>
                <p>Цена: ${this.product.price} рублей</p>
            </div>
        `;
    }
}
