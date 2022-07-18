import { ConfigState } from '../Interfaces/ConfigState';

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
    static isExist = false;
    static instance: ConfigStore;

    public state = defaultConfigState;

    constructor() {
        if (ConfigStore.isExist) {
            return ConfigStore.instance;
        }

        ConfigStore.isExist = true;
        ConfigStore.instance = this;
    }

    update(state: Partial<ConfigState>) {
        this.state = {
            ...this.state,
            ...state,
        };
    }
}

export const configStore = new ConfigStore();
