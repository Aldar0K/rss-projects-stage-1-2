import { ProductsItem } from '../ProductsItem/ProductsItem';
import { productsModel } from '../../Models/ProductsModel';
import { Product } from '../../Interfaces/Product';
import { appStore } from '../../Store/AppStore';
import { configStore } from '../../Store/ConfigStore';
import { app } from '../../App';

export class ProductsList {
    private loading = false;
    private error: Error | null = null;
    private products: Product[] = [];

    public productsContainer = document.querySelector('.main__products') as HTMLDivElement;

    constructor() {
        this.fetchProducts();
    }

    fetchProducts(): void {
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
                if (localStorage.getItem('configStore') && localStorage.getItem('appStore')) {
                    configStore.load();
                    appStore.load();
                    this.products.forEach((product) => {
                        if (appStore.state.cart.productsIds.includes(product.id)) {
                            product.inCart = true;
                        }
                    });
                }
                this.updateHtml();
                this.productsContainer.innerHTML = this.render();
                this.addEvents();
            });
    }

    render(): string {
        return `
        ${appStore.state.products
            .map((product: Product) => new ProductsItem(product))
            .map((product: ProductsItem) => product.render())
            .join('')}
        ${this.loading ? '<p>Loading...</p>' : ''}
        ${this.error ? `<p>${this.error.message}</p>` : ''}
        `;
    }

    addEvents(): void {
        (document.querySelectorAll('.main__product') as NodeListOf<HTMLDivElement>).forEach((el) => {
            el.addEventListener('click', () => {
                if (el.classList.contains('main__product_active')) {
                    el.classList.remove('main__product_active');
                    this.products[Number(el.id) - 1].inCart = false;
                    this.updateAppStore();
                    app.cartUpdate(Number(el.id));
                } else {
                    if (app.cart.amount === 20) {
                        alert('Извините, все слоты заполнены');
                    } else {
                        el.classList.add('main__product_active');
                        this.products[Number(el.id) - 1].inCart = true;
                        this.updateAppStore();
                        app.cartUpdate(Number(el.id));
                    }
                }
            });
        });
    }

    updateAppStore(products = this.products): void {
        appStore.update({
            products: products,
        });
    }

    updateHtml(): void {
        this.updateAppStore();

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

        // Проверка на поисковую строку.
        if (configStore.state.search) {
            const value = configStore.state.search;
            const regExp = new RegExp(value, 'i');
            this.updateAppStore(appStore.state.products.filter((a) => a.name.match(regExp)));
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
            this.productsContainer.innerHTML = '<h3>Извините, совпадений не обнаружено</h3>';
        } else {
            this.productsContainer.innerHTML = this.render();
            this.addEvents();
        }
    }

    // Сортировка.
    sortByNameAToZ(): void {
        configStore.update({ sort: 'sortByNameAToZ' });
        this.updateHtml();
    }

    sortByNameZToA(): void {
        configStore.update({ sort: 'sortByNameZToA' });
        this.updateHtml();
    }

    sortByYearMinMax(): void {
        configStore.update({ sort: 'sortByYearMinMax' });
        this.updateHtml();
    }

    sortByYearMaxMin(): void {
        configStore.update({ sort: 'sortByYearMaxMin' });
        this.updateHtml();
    }

    sortByPriceMinMax(): void {
        configStore.update({ sort: 'sortByPriceMinMax' });
        this.updateHtml();
    }

    sortByPriceMaxMin(): void {
        configStore.update({ sort: 'sortByPriceMaxMin' });
        this.updateHtml();
    }

    // Фильтры по диапазону.
    filterAmount([from, to]: Array<number>): void {
        configStore.update({ filterAmount: [from, to] });
        this.updateHtml();
    }

    filterYear([from, to]: Array<number>): void {
        configStore.update({ filterYear: [from, to] });
        this.updateHtml();
    }

    // Фильтры по значению.
    filterBrand(brand: string): void {
        const arrOfBrands = configStore.state.filterBrand;
        if (arrOfBrands.includes(brand)) {
            arrOfBrands.splice(arrOfBrands.indexOf(brand), 1);
        } else {
            arrOfBrands.push(brand);
        }

        this.updateHtml();
    }

    filterCameras(cameras: string): void {
        const arrOfCameras = configStore.state.filterCameras;
        if (arrOfCameras.includes(cameras)) {
            arrOfCameras.splice(arrOfCameras.indexOf(cameras), 1);
        } else {
            arrOfCameras.push(cameras);
        }

        this.updateHtml();
    }

    filterColor(color: string): void {
        const arrOfColors = configStore.state.filterColor;
        if (arrOfColors.includes(color)) {
            arrOfColors.splice(arrOfColors.indexOf(color), 1);
        } else {
            arrOfColors.push(color);
        }

        this.updateHtml();
    }

    filterInCart(): void {
        if (configStore.state.filterInCart) {
            configStore.state.filterInCart = false;
        } else {
            configStore.state.filterInCart = true;
        }

        this.updateHtml();
    }

    filterSearch(value: string): void {
        configStore.state.search = value;
        this.updateHtml();
    }

    resetFilters(): void {
        configStore.update({
            search: '',
            filterAmount: [0, 50],
            filterYear: [2016, 2022],
            filterBrand: [''],
            filterCameras: [''],
            filterColor: [''],
            filterInCart: false,
        });
        this.updateHtml();
    }
}
