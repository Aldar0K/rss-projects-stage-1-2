import { ConfigState } from '../Interfaces/ConfigState';
import * as noUiSlider from 'nouislider';

const defaultConfigState: ConfigState = {
    search: '',
    sort: '',
    filterAmount: [0, 50],
    filterYear: [2016, 2022],
    filterBrand: [''],
    filterCameras: [''],
    filterColor: [''],
    filterInCart: false,
};

export class ConfigStore {
    static isExist: boolean;
    static instance: ConfigStore;

    public state = defaultConfigState;

    constructor() {
        if (ConfigStore.isExist) {
            return ConfigStore.instance;
        }

        ConfigStore.isExist = true;
        ConfigStore.instance = this;
    }

    update(state: Partial<ConfigState>): void {
        this.state = {
            ...this.state,
            ...state,
        };
    }

    load() {
        const loadedConfig = localStorage.getItem('configStore') as string;
        const parsedConfig = JSON.parse(loadedConfig) as ConfigStore;
        this.update(parsedConfig.state);

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
        const camerasButtons = document.querySelectorAll('.button_cameras') as NodeListOf<HTMLButtonElement>;
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
    }
}

export const configStore = new ConfigStore();
