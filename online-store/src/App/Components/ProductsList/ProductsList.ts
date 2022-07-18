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
    }

    updateConfigStore(config: object) {
        configStore.update(config);
    }

    updateHtml() {
        appStore.update({
            products: this.products,
        });

        // Поверка на фильтры по диапазону.
        if (configStore.state.filterAmount) {
            const from = configStore.state.filterAmount[0];
            const to = configStore.state.filterAmount[1];
            this.updateAppStore(appStore.state.products.filter((a) => a.amount >= from && a.amount <= to));
        }
        if (configStore.state.filterYear) {
            const from = configStore.state.filterYear[0];
            const to = configStore.state.filterYear[1];
            this.updateAppStore(appStore.state.products.filter((a) => a.release >= from && a.release <= to));
        }

        // Поверка на фильтры по значению.
        if (configStore.state.filterBrand.length > 1) {
            const brandsArr = configStore.state.filterBrand;
            this.updateAppStore(appStore.state.products.filter((a) => brandsArr.includes(a.brand.toLowerCase())));
        }
        if (configStore.state.filterCameras.length > 1) {
            const camerasArr = configStore.state.filterCameras;
            this.updateAppStore(appStore.state.products.filter((a) => camerasArr.includes(a.cameras)));
        }
        if (configStore.state.filterColor.length > 1) {
            const colorsArr = configStore.state.filterColor;
            this.updateAppStore(appStore.state.products.filter((a) => colorsArr.includes(a.color)));
        }
        if (configStore.state.filterInCart) {
            this.updateAppStore(appStore.state.products.filter((a) => a.inCart));
        }

        // Проверка сортировки.
        if (configStore.state.sort) {
            switch (configStore.state.sort) {
                case 'sortByNameAToZ':
                    this.updateAppStore(appStore.state.products.sort((a, b) => a.name.localeCompare(b.name)));
                    break;
                case 'sortByNameZToA':
                    this.updateAppStore(appStore.state.products.sort((a, b) => b.name.localeCompare(a.name)));
                    break;
                case 'sortByYearMinMax':
                    this.updateAppStore(appStore.state.products.sort((a, b) => a.release - b.release));
                    break;
                case 'sortByYearMaxMin':
                    this.updateAppStore(appStore.state.products.sort((a, b) => b.release - a.release));
                    break;
                case 'sortByPriceMinMax':
                    this.updateAppStore(appStore.state.products.sort((a, b) => a.price - b.price));
                    break;
                case 'sortByPriceMaxMin':
                    this.updateAppStore(appStore.state.products.sort((a, b) => b.price - a.price));
                    break;
            }
        }

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

        console.clear();
        console.log(configStore.state);
        console.log(appStore.state);
    }

    // Сортировка.
    sortByNameAToZ() {
        // this.updateAppStore(appStore.state.products.sort((a, b) => a.name.localeCompare(b.name)));
        this.updateConfigStore({ sort: 'sortByNameAToZ' });
        this.updateHtml();
    }

    sortByNameZToA() {
        // this.updateAppStore(appStore.state.products.sort((a, b) => b.name.localeCompare(a.name)));
        this.updateConfigStore({ sort: 'sortByNameZToA' });
        this.updateHtml();
    }

    sortByYearMinMax() {
        // this.updateAppStore(appStore.state.products.sort((a, b) => a.release - b.release));
        this.updateConfigStore({ sort: 'sortByYearMinMax' });
        this.updateHtml();
    }

    sortByYearMaxMin() {
        // this.updateAppStore(appStore.state.products.sort((a, b) => b.release - a.release));
        this.updateConfigStore({ sort: 'sortByYearMaxMin' });
        this.updateHtml();
    }

    sortByPriceMinMax() {
        // this.updateAppStore(appStore.state.products.sort((a, b) => a.price - b.price));
        this.updateConfigStore({ sort: 'sortByPriceMinMax' });
        this.updateHtml();
    }

    sortByPriceMaxMin() {
        // this.updateAppStore(appStore.state.products.sort((a, b) => b.price - a.price));
        this.updateConfigStore({ sort: 'sortByPriceMaxMin' });
        this.updateHtml();
    }

    // Фильтры по диапазону.
    filterAmount([from, to]: Array<number>) {
        // this.updateAppStore(this.products.filter((a) => a.amount >= from && a.amount <= to));
        this.updateConfigStore({ filterAmount: [from, to] });
        this.updateHtml();
    }

    filterYear([from, to]: Array<number>) {
        // this.updateAppStore(appStore.state.products.filter((a) => a.release >= from && a.release <= to));
        this.updateConfigStore({ filterYear: [from, to] });
        this.updateHtml();
    }

    // Фильтры по значению.
    filterBrand(brand: string) {
        // this.updateAppStore(this.products.filter((a) => a.brand.toLowerCase() === brand.toLowerCase()));

        const arrOfBrands = configStore.state.filterBrand;
        if (arrOfBrands.includes(brand)) {
            arrOfBrands.splice(arrOfBrands.indexOf(brand), 1);
        } else {
            arrOfBrands.push(brand);
        }

        // this.updateConfigStore({ filterBrand: brand });
        this.updateHtml();
    }

    filterCameras(cameras: string) {
        // this.updateAppStore(appStore.state.products.filter((a) => a.cameras === cameras));

        const arrOfCameras = configStore.state.filterCameras;
        if (arrOfCameras.includes(cameras)) {
            arrOfCameras.splice(arrOfCameras.indexOf(cameras), 1);
        } else {
            arrOfCameras.push(cameras);
        }

        // this.updateConfigStore({ filterCameras: cameras });
        this.updateHtml();
    }

    filterColor(color: string) {
        // this.updateAppStore(appStore.state.products.filter((a) => a.color === color));

        const arrOfColors = configStore.state.filterColor;
        if (arrOfColors.includes(color)) {
            arrOfColors.splice(arrOfColors.indexOf(color), 1);
        } else {
            arrOfColors.push(color);
        }

        // this.updateConfigStore({ filterColor: color });
        this.updateHtml();
    }

    filterInCart() {
        // this.updateAppStore(appStore.state.products.filter((a) => a.inCart));

        if (configStore.state.filterInCart) {
            configStore.state.filterInCart = false;
        } else {
            configStore.state.filterInCart = true;
        }

        // this.updateConfigStore({ filterInCart: true });
        this.updateHtml();
    }
}
