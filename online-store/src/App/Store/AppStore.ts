import { State } from '../Interfaces/State';

const defaultState: State = {
    products: [],
    cart: {
        productsIds: [],
        amount: 0,
    },
};

export class AppStore {
    static isExist: boolean;
    static instance: AppStore;

    public state = defaultState;

    constructor() {
        if (AppStore.isExist) {
            return AppStore.instance;
        }

        AppStore.isExist = true;
        AppStore.instance = this;
    }

    update(state: Partial<State>): void {
        this.state = {
            ...this.state,
            ...state,
        };
    }

    load(): void {
        const loadedAppStore = localStorage.getItem('appStore') as string;
        const parsedAppStore = JSON.parse(loadedAppStore) as AppStore;
        appStore.state = parsedAppStore.state;
    }
}

export const appStore = new AppStore();
