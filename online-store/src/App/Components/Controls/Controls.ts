import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { app } from '../../App';
import { Product } from '../../Interfaces/Product';
import { appStore } from '../../Store/AppStore';
import { configStore } from '../../Store/ConfigStore';

export class Controls {
    private sliderAmount: HTMLDivElement;
    private sliderYear: HTMLDivElement;
    private filterResetButton: HTMLButtonElement;
    private brandButtons: NodeListOf<HTMLButtonElement>;
    private camerasButtons: NodeListOf<HTMLButtonElement>;
    private colorButtons: NodeListOf<HTMLButtonElement>;
    private cartCheckBox: HTMLInputElement;
    private searchBar: HTMLInputElement;
    private sorterSelect: HTMLSelectElement;
    private storageResetButton: HTMLButtonElement;

    constructor() {
        this.sliderAmount = document.getElementById('slider-amount') as HTMLDivElement;
        this.generateSlider(this.sliderAmount, [0, 50]);
        this.sliderYear = document.getElementById('slider-year') as HTMLDivElement;
        this.generateSlider(this.sliderYear, [2016, 2022]);

        this.brandButtons = document.querySelectorAll('.button_brand') as NodeListOf<HTMLButtonElement>;
        this.camerasButtons = document.querySelectorAll('.button_cameras') as NodeListOf<HTMLButtonElement>;
        this.colorButtons = document.querySelectorAll('.button_color') as NodeListOf<HTMLButtonElement>;
        this.cartCheckBox = document.querySelector('.input-cart') as HTMLInputElement;

        this.searchBar = document.querySelector('.search-bar-input') as HTMLInputElement;

        this.sorterSelect = document.querySelector('.main__sorter-select') as HTMLSelectElement;

        this.filterResetButton = document.querySelector('.reset-filters-button') as HTMLButtonElement;

        this.storageResetButton = document.querySelector('.reset-storage-button') as HTMLButtonElement;

        this.addEvents();
    }

    generateSlider(element: HTMLElement, [start, end]: number[]): void {
        noUiSlider.create(element, {
            start: [start, end],
            connect: true,
            range: {
                min: start,
                max: end,
            },
            step: 1,
            tooltips: true,
            format: {
                to: (value) => Number(value),
                from: (value) => Number(value),
            },
        });
    }

    resetFiltersByRange = (): void => {
        (this.sliderAmount as noUiSlider.target).noUiSlider?.set([0, 50]);
        (this.sliderYear as noUiSlider.target).noUiSlider?.set([2016, 2022]);
    };

    resetFiltersByValue = (): void => {
        this.brandButtons.forEach((button) => {
            button.classList.remove('button_active');
        });
        this.colorButtons.forEach((button) => {
            button.classList.remove('button_active');
        });
        this.camerasButtons.forEach((button) => {
            button.classList.remove('button_active');
        });
        this.cartCheckBox.checked = false;
    };

    resetFilterBySearch = (): void => {
        this.searchBar.value = '';
    };

    saveToLocalStorage = (): void => {
        localStorage.setItem('configStore', JSON.stringify(configStore));
        localStorage.setItem('appStore', JSON.stringify(appStore));
    };

    addEvents = (): void => {
        (this.sliderAmount as noUiSlider.target).noUiSlider?.on('change', () => {
            const data = (this.sliderAmount as noUiSlider.target).noUiSlider?.get() as Array<number>;
            app.productsList.filterAmount(data);
        });
        (this.sliderYear as noUiSlider.target).noUiSlider?.on('change', () => {
            const data = (this.sliderYear as noUiSlider.target).noUiSlider?.get() as Array<number>;
            app.productsList.filterYear(data);
        });

        this.filterResetButton.addEventListener('click', () => {
            app.productsList.resetFilters();
            this.resetFiltersByRange();
            this.resetFiltersByValue();
            this.resetFilterBySearch();
        });

        this.brandButtons.forEach((button) => {
            button.addEventListener('click', () => {
                if (!button.classList.contains('button_active')) {
                    button.classList.add('button_active');
                } else {
                    button.classList.remove('button_active');
                }
                const brand = button.dataset.brand as string;
                app.productsList.filterBrand(brand);
            });
        });
        this.camerasButtons.forEach((button) => {
            button.addEventListener('click', () => {
                if (!button.classList.contains('button_active')) {
                    button.classList.add('button_active');
                } else {
                    button.classList.remove('button_active');
                }

                const cameras = button.dataset.cameras as string;
                app.productsList.filterCameras(cameras);
            });
        });
        this.colorButtons.forEach((button) => {
            button.addEventListener('click', () => {
                if (!button.classList.contains('button_active')) {
                    button.classList.add('button_active');
                } else {
                    button.classList.remove('button_active');
                }

                const color = button.dataset.color as string;
                app.productsList.filterColor(color);
            });
        });
        this.cartCheckBox.addEventListener('change', () => {
            app.productsList.filterInCart();
        });
        this.searchBar.addEventListener('input', () => {
            const value = this.searchBar.value;
            app.productsList.filterSearch(value);
        });
        this.sorterSelect.addEventListener('change', () => {
            switch (this.sorterSelect.selectedIndex) {
                case 1:
                    app.productsList.sortByNameAToZ();
                    break;
                case 2:
                    app.productsList.sortByNameZToA();
                    break;
                case 3:
                    app.productsList.sortByYearMinMax();
                    break;
                case 4:
                    app.productsList.sortByYearMaxMin();
                    break;
                case 5:
                    app.productsList.sortByPriceMinMax();
                    break;
                case 6:
                    app.productsList.sortByPriceMaxMin();
                    break;
            }
        });

        this.storageResetButton.addEventListener('click', () => {
            window.removeEventListener('beforeunload', this.saveToLocalStorage);
            localStorage.clear();
            location.reload();
        });

        window.addEventListener('beforeunload', this.saveToLocalStorage);
    };

    updateAppStore(products: Product[]): void {
        appStore.update({
            products: products,
        });
    }

    update() {
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
    }
}
