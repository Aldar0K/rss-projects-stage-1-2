import { ProductsItem } from '../ProductsItem/ProductsItem';
import { productsModel } from '../../Models/ProductsModel';
import { Product } from '../../Interfaces/Product';
import { appStore } from '../../Store/AppStore';
import { configStore } from '../../Store/ConfigStore';
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
        ${appStore.state.products
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

        console.log(appStore.state);
    }

    updateConfigStore(config: object) {
        configStore.update(config);

        console.log(configStore.state);
    }

    updateHtml() {
        if (appStore.state.products.length === 0) {
            productsContainer.innerHTML = '<h3>Извините, совпадений не обнаружено</h3>';
        } else {
            productsContainer.innerHTML = `
                ${appStore.state.products
                    .map((product: Product) => new ProductsItem(product))
                    .map((product: ProductsItem) => product.render())
                    .join('')}
            `;
            this.addEvents();
        }
    }

    // Сортировка.
    sortByNameAToZ() {
        this.updateAppStore(appStore.state.products.sort((a, b) => a.name.localeCompare(b.name)));
        this.updateConfigStore({ sort: 'sortByNameAToZ' });
        this.updateHtml();
    }

    sortByNameZToA() {
        this.updateAppStore(appStore.state.products.sort((a, b) => b.name.localeCompare(a.name)));
        this.updateConfigStore({ sort: 'sortByNameZToA' });
        this.updateHtml();
    }

    sortByYearMinMax() {
        this.updateAppStore(appStore.state.products.sort((a, b) => a.release - b.release));
        this.updateConfigStore({ sort: 'sortByYearMinMax' });
        this.updateHtml();
    }

    sortByYearMaxMin() {
        this.updateAppStore(appStore.state.products.sort((a, b) => b.release - a.release));
        this.updateHtml();
    }

    sortByPriceMinMax() {
        this.updateAppStore(appStore.state.products.sort((a, b) => a.price - b.price));
        this.updateHtml();
    }

    sortByPriceMaxMin() {
        this.updateAppStore(appStore.state.products.sort((a, b) => b.price - a.price));
        this.updateHtml();
    }

    // Фильтры по диапазону.
    filterAmount([from, to]: Array<number>) {
        this.updateAppStore(this.products.filter((a) => a.amount >= from && a.amount <= to));
        this.updateConfigStore({ filterAmount: [from, to] });
        this.updateHtml();
    }

    filterYear([from, to]: Array<number>) {
        this.updateAppStore(this.products.filter((a) => a.release >= from && a.release <= to));

        this.updateHtml();
    }

    // Фильтры по значению.
    filterBrand(brand: string) {
        this.updateAppStore(this.products.filter((a) => a.brand.toLowerCase() === brand.toLowerCase()));

        this.updateHtml();
    }

    filterCameras(cameras: number) {
        this.updateAppStore(this.products.filter((a) => a.cameras === cameras));

        this.updateHtml();
    }

    filterColor(color: string) {
        this.updateAppStore(this.products.filter((a) => a.color === color));

        this.updateHtml();
    }

    filterInCart() {
        this.updateAppStore(this.products.filter((a) => a.inCart));

        this.updateHtml();
    }
}
