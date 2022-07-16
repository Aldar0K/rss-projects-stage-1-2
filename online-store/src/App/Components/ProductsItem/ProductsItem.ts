import { Product } from '../../Interfaces/Product';

export class ProductsItem {
    constructor(private product: Product) {}

    render() {
        return `
            <div class="main__product${this.product.inCart ? ' main__product_active' : ''}">
                <h3>${this.product.name}</h3>
                <img src = "${this.product.image}" alt = "${this.product.name}"/>
                <span>Количество: ${this.product.amount}</span>
                <span>Год выхода: ${this.product.release}</span>
                <span>Производитель: ${this.product.brand}</span>
                <span>Цвет: ${this.product.color}</span>
                <span>Количество камер: ${this.product.cameras}</span>
                <span>Цена: ${this.product.price} рублей</span>
            </div>
        `;
    }
}
