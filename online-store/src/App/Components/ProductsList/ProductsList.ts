import { ProductsItem } from '../ProductsItem/ProductsItem';
import { productsModel } from '../../Models/ProductsModel';
import { Product } from '../../Interfaces/Product';
// import { appStore } from '../../Store/AppStore';
import { app } from '../../App';
// import { AppComponent } from '../../Interfaces/AppComponent';

const productsContainer = document.querySelector('.main__products') as HTMLDivElement;

// export class ProductsList implements AppComponent {
export class ProductsList {
    private loading = false;
    private error: Error | null = null;
    private products: Product[] = [];

    constructor() {
        this.fetchProducts();
    }

    fetchProducts() {
        this.loading = true;
        productsModel
            .getProducts()
            .then((products) => {
                this.products = products;
            })
            .catch((error) => {
                this.error = error;
            })
            .finally(() => {
                this.loading = false;
                productsContainer.innerHTML = this.render();

                (document.querySelectorAll('.main__product') as NodeListOf<HTMLDivElement>).forEach((el) =>
                    this.addEvents(el)
                );
            });
    }

    render() {
        // console.log(this.products);
        return `
        ${this.products
            // .filter((product: Product) => product.brand === 'Apple')
            .map((product: Product) => new ProductsItem(product))
            .map((product: ProductsItem) => product.render())
            .join('')}
        ${this.loading ? '<p>Loading...</p>' : ''}
        ${this.error ? `<p>${this.error.message}</p>` : ''}
        `;
    }

    addEvents(el: HTMLDivElement) {
        el.addEventListener('click', () => {
            console.log('click on card');
            if (el.classList.contains('main__product_active')) {
                el.classList.remove('main__product_active');
                app.cartUpdate(true);
            } else {
                el.classList.add('main__product_active');
                app.cartUpdate(false);
            }
        });
    }
}
