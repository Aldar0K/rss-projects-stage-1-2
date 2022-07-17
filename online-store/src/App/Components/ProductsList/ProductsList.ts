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

    sortByNameAToZ() {
        productsContainer.innerHTML = `
        ${this.products
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((product: Product) => new ProductsItem(product))
            .map((product: ProductsItem) => product.render())
            .join('')}
        `;
    }

    sortByNameZToA() {
        productsContainer.innerHTML = `
        ${this.products
            .sort((a, b) => b.name.localeCompare(a.name))
            .map((product: Product) => new ProductsItem(product))
            .map((product: ProductsItem) => product.render())
            .join('')}
        `;
    }

    sortByYearMinMax() {
        productsContainer.innerHTML = `
        ${this.products
            .sort((a, b) => a.release - b.release)
            .map((product: Product) => new ProductsItem(product))
            .map((product: ProductsItem) => product.render())
            .join('')}
        `;
    }

    sortByYearMaxMin() {
        productsContainer.innerHTML = `
        ${this.products
            .sort((a, b) => b.release - a.release)
            .map((product: Product) => new ProductsItem(product))
            .map((product: ProductsItem) => product.render())
            .join('')}
        `;
    }

    sortByPriceMaxMin() {
        productsContainer.innerHTML = `
        ${this.products
            .sort((a, b) => b.price - a.price)
            .map((product: Product) => new ProductsItem(product))
            .map((product: ProductsItem) => product.render())
            .join('')}
        `;
    }

    sortByPriceMinMax() {
        productsContainer.innerHTML = `
        ${this.products
            .sort((a, b) => a.price - b.price)
            .map((product: Product) => new ProductsItem(product))
            .map((product: ProductsItem) => product.render())
            .join('')}
        `;
    }
}
