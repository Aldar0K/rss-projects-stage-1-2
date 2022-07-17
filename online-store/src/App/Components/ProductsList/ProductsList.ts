import { ProductsItem } from '../ProductsItem/ProductsItem';
import { productsModel } from '../../Models/ProductsModel';
import { Product } from '../../Interfaces/Product';
import { appStore } from '../../Store/AppStore';
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
                this.addEvents();
            });
    }

    render() {
        return `
        ${this.products
            .map((product: Product) => new ProductsItem(product))
            .map((product: ProductsItem) => product.render())
            .join('')}
        ${this.loading ? '<p>Loading...</p>' : ''}
        ${this.error ? `<p>${this.error.message}</p>` : ''}
        `;
    }

    addEvents() {
        (document.querySelectorAll('.main__product') as NodeListOf<HTMLDivElement>).forEach((el) => {
            el.addEventListener('click', () => {
                if (el.classList.contains('main__product_active')) {
                    el.classList.remove('main__product_active');
                    this.products[Number(el.id) - 1].inCart = false;
                    this.updateAppStore();
                    app.cartUpdate(true);
                } else {
                    el.classList.add('main__product_active');
                    this.products[Number(el.id) - 1].inCart = true;
                    this.updateAppStore();
                    app.cartUpdate(false);
                }
            });
        });
    }

    updateAppStore() {
        appStore.update({
            products: this.products,
        });
    }

    sortByNameAToZ() {
        this.updateAppStore();
        console.log(appStore);

        productsContainer.innerHTML = `
        ${appStore.state.products
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((product: Product) => new ProductsItem(product))
            .map((product: ProductsItem) => product.render())
            .join('')}
        `;
        this.addEvents();
        appStore.update({
            products: this.products,
        });
        console.log(appStore);
    }

    sortByNameZToA() {
        this.updateAppStore();
        console.log(appStore);

        productsContainer.innerHTML = `
        ${appStore.state.products
            .sort((a, b) => b.name.localeCompare(a.name))
            .map((product: Product) => new ProductsItem(product))
            .map((product: ProductsItem) => product.render())
            .join('')}
        `;
        this.addEvents();
    }

    sortByYearMinMax() {
        this.updateAppStore();
        console.log(appStore);

        productsContainer.innerHTML = `
        ${appStore.state.products
            .sort((a, b) => a.release - b.release)
            .map((product: Product) => new ProductsItem(product))
            .map((product: ProductsItem) => product.render())
            .join('')}
        `;
        this.addEvents();
    }

    sortByYearMaxMin() {
        this.updateAppStore();
        console.log(appStore);

        productsContainer.innerHTML = `
        ${appStore.state.products
            .sort((a, b) => b.release - a.release)
            .map((product: Product) => new ProductsItem(product))
            .map((product: ProductsItem) => product.render())
            .join('')}
        `;
        this.addEvents();
    }

    sortByPriceMaxMin() {
        this.updateAppStore();
        console.log(appStore);

        productsContainer.innerHTML = `
        ${appStore.state.products
            .sort((a, b) => b.price - a.price)
            .map((product: Product) => new ProductsItem(product))
            .map((product: ProductsItem) => product.render())
            .join('')}
        `;
        this.addEvents();
    }

    sortByPriceMinMax() {
        this.updateAppStore();
        console.log(appStore);

        productsContainer.innerHTML = `
        ${appStore.state.products
            .sort((a, b) => a.price - b.price)
            .map((product: Product) => new ProductsItem(product))
            .map((product: ProductsItem) => product.render())
            .join('')}
        `;
        this.addEvents();
    }

    filterAmount([from, to]: Array<number>) {
        this.updateAppStore();
        console.log(appStore);

        productsContainer.innerHTML = `
        ${appStore.state.products
            .filter((a) => a.amount >= from && a.amount <= to)
            .map((product: Product) => new ProductsItem(product))
            .map((product: ProductsItem) => product.render())
            .join('')}
        `;
        this.addEvents();
    }

    filterYear([from, to]: Array<number>) {
        this.updateAppStore();
        console.log(appStore);

        productsContainer.innerHTML = `
        ${appStore.state.products
            .filter((a) => a.release >= from && a.release <= to)
            .map((product: Product) => new ProductsItem(product))
            .map((product: ProductsItem) => product.render())
            .join('')}
        `;
        this.addEvents();
    }
}
