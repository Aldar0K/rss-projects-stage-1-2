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

    updateAppStore(prod = this.products) {
        appStore.update({
            products: prod,
        });
    }

    sortByNameAToZ() {
        productsContainer.innerHTML = `
        ${appStore.state.products
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((product: Product) => new ProductsItem(product))
            .map((product: ProductsItem) => product.render())
            .join('')}
        `;
        this.addEvents();

        this.updateAppStore(appStore.state.products.sort((a, b) => a.name.localeCompare(b.name)));
        console.log(appStore);
    }

    sortByNameZToA() {
        productsContainer.innerHTML = `
        ${appStore.state.products
            .sort((a, b) => b.name.localeCompare(a.name))
            .map((product: Product) => new ProductsItem(product))
            .map((product: ProductsItem) => product.render())
            .join('')}
        `;
        this.addEvents();

        this.updateAppStore(appStore.state.products.sort((a, b) => b.name.localeCompare(a.name)));
        console.log(appStore);
    }

    sortByYearMinMax() {
        productsContainer.innerHTML = `
        ${appStore.state.products
            .sort((a, b) => a.release - b.release)
            .map((product: Product) => new ProductsItem(product))
            .map((product: ProductsItem) => product.render())
            .join('')}
        `;
        this.addEvents();

        this.updateAppStore(appStore.state.products.sort((a, b) => a.release - b.release));
        console.log(appStore);
    }

    sortByYearMaxMin() {
        productsContainer.innerHTML = `
        ${appStore.state.products
            .sort((a, b) => b.release - a.release)
            .map((product: Product) => new ProductsItem(product))
            .map((product: ProductsItem) => product.render())
            .join('')}
        `;
        this.addEvents();

        this.updateAppStore(appStore.state.products.sort((a, b) => b.release - a.release));
        console.log(appStore);
    }

    sortByPriceMaxMin() {
        productsContainer.innerHTML = `
        ${appStore.state.products
            .sort((a, b) => b.price - a.price)
            .map((product: Product) => new ProductsItem(product))
            .map((product: ProductsItem) => product.render())
            .join('')}
        `;
        this.addEvents();

        this.updateAppStore(appStore.state.products.sort((a, b) => b.price - a.price));
        console.log(appStore);
    }

    sortByPriceMinMax() {
        productsContainer.innerHTML = `
        ${appStore.state.products
            .sort((a, b) => a.price - b.price)
            .map((product: Product) => new ProductsItem(product))
            .map((product: ProductsItem) => product.render())
            .join('')}
        `;
        this.addEvents();

        this.updateAppStore(appStore.state.products.sort((a, b) => a.price - b.price));
        console.log(appStore);
    }

    filterAmount([from, to]: Array<number>) {
        this.updateAppStore(this.products.filter((a) => a.amount >= from && a.amount <= to));
        console.log(appStore);

        productsContainer.innerHTML = `
        ${appStore.state.products
            .map((product: Product) => new ProductsItem(product))
            .map((product: ProductsItem) => product.render())
            .join('')}
        `;
        this.addEvents();
    }

    filterYear([from, to]: Array<number>) {
        this.updateAppStore(this.products.filter((a) => a.release >= from && a.release <= to));
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
