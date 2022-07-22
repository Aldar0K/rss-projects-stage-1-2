import { ProductsItem } from '../ProductsItem/ProductsItem';
import { productsModel } from '../../Models/ProductsModel';
import { Product } from '../../Interfaces/Product';
import { AppStore, appStore } from '../../Store/AppStore';
import { ConfigStore, configStore } from '../../Store/ConfigStore';
import { app } from '../../App';
import * as noUiSlider from 'nouislider';

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
                    // Загрузка настроек сортировки и фильтров.
                    const loadedConfig = localStorage.getItem('configStore') as string;
                    const parsedConfig = JSON.parse(loadedConfig) as ConfigStore;
                    this.updateConfigStore(parsedConfig.state);

                    (document.querySelector('.main__sorter-select') as HTMLSelectElement).value = [
                        '',
                        'sortByNameAToZ',
                        'sortByNameZToA',
                        'sortByYearMinMax',
                        'sortByYearMaxMin',
                        'sortByPriceMinMax',
                        'sortByPriceMaxMin',
                    ]
                        .indexOf(parsedConfig.state.sort)
                        .toString();

                    const sliderAmount = document.getElementById('slider-amount') as HTMLDivElement;
                    const sliderYear = document.getElementById('slider-year') as HTMLDivElement;
                    (sliderAmount as noUiSlider.target).noUiSlider?.set(parsedConfig.state.filterAmount);
                    (sliderYear as noUiSlider.target).noUiSlider?.set(parsedConfig.state.filterYear);

                    const searchBar = document.querySelector('.search-bar-input') as HTMLInputElement;
                    searchBar.value = parsedConfig.state.search;

                    const brandButtons = document.querySelectorAll('.button_brand') as NodeListOf<HTMLButtonElement>;
                    const camerasButtons = document.querySelectorAll(
                        '.button_cameras'
                    ) as NodeListOf<HTMLButtonElement>;
                    const colorButtons = document.querySelectorAll('.button_color') as NodeListOf<HTMLButtonElement>;
                    const cartCheckBox = document.querySelector('.input-cart') as HTMLInputElement;
                    brandButtons.forEach((button) => {
                        const brand = button.dataset.brand as string;
                        if (parsedConfig.state.filterBrand.includes(brand)) {
                            button.classList.add('button_active');
                        }
                    });
                    camerasButtons.forEach((button) => {
                        const cameras = button.dataset.cameras as string;
                        if (parsedConfig.state.filterCameras.includes(cameras)) {
                            button.classList.add('button_active');
                        }
                    });
                    colorButtons.forEach((button) => {
                        const color = button.dataset.color as string;
                        if (parsedConfig.state.filterColor.includes(color)) {
                            button.classList.add('button_active');
                        }
                    });
                    cartCheckBox.checked = parsedConfig.state.filterInCart;

                    // Загрузка продуктов и товаров в корзине.
                    const loadedAppStore = localStorage.getItem('appStore') as string;
                    const parsedAppStore = JSON.parse(loadedAppStore) as AppStore;
                    appStore.state = parsedAppStore.state;
                    this.products.forEach((product) => {
                        if (parsedAppStore.state.cart.productsIds.includes(product.id)) {
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

    updateConfigStore(config: object): void {
        configStore.update(config);
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
        this.updateConfigStore({ sort: 'sortByNameAToZ' });
        this.updateHtml();
    }

    sortByNameZToA(): void {
        this.updateConfigStore({ sort: 'sortByNameZToA' });
        this.updateHtml();
    }

    sortByYearMinMax(): void {
        this.updateConfigStore({ sort: 'sortByYearMinMax' });
        this.updateHtml();
    }

    sortByYearMaxMin(): void {
        this.updateConfigStore({ sort: 'sortByYearMaxMin' });
        this.updateHtml();
    }

    sortByPriceMinMax(): void {
        this.updateConfigStore({ sort: 'sortByPriceMinMax' });
        this.updateHtml();
    }

    sortByPriceMaxMin(): void {
        this.updateConfigStore({ sort: 'sortByPriceMaxMin' });
        this.updateHtml();
    }

    // Фильтры по диапазону.
    filterAmount([from, to]: Array<number>): void {
        this.updateConfigStore({ filterAmount: [from, to] });
        this.updateHtml();
    }

    filterYear([from, to]: Array<number>): void {
        this.updateConfigStore({ filterYear: [from, to] });
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
        this.updateConfigStore({
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
