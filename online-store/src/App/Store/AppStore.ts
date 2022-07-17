// import { app } from '../App';
import { State } from '../Interfaces/State';

const defaultState: State = {
    products: [],
    cart: { amount: 0 },
};

export class AppStore {
    static isExist = false;
    static instance: AppStore;

    private state = defaultState;

    constructor() {
        if (AppStore.isExist) {
            return AppStore.instance;
        }

        AppStore.isExist = true;
        AppStore.instance = this;

        // this.state = localStorage.getItem('state')? localStorage.getItem('state') : defaultState;
    }

    update(state: Partial<State>) {
        this.state = {
            ...this.state,
            ...state,
        };
    }
}

export const appStore = new AppStore();
