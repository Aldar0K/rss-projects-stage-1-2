// import { app } from '../App';
import { State } from '../Interfaces/State';

const defaultState: State = {
    products: [],
    cart: {
        productsIds: [],
        amount: 0,
    },
};

export class AppStore {
    static isExist = false;
    static instance: AppStore;

    public state = defaultState;

    constructor() {
        if (AppStore.isExist) {
            return AppStore.instance;
        }

        AppStore.isExist = true;
        AppStore.instance = this;
    }

    update(state: Partial<State>) {
        this.state = {
            ...this.state,
            ...state,
        };
    }
}

export const appStore = new AppStore();
