import { State } from "./State";


const defaultState: State = {
    products: [],
    cart: { amount: 0 }
}

export class AppStore {
    static isExist = false;
    static instance: AppStore;

    private state: State;

    constructor() {
        if (AppStore.isExist) {
            return AppStore.instance;
        }

        AppStore.isExist = true;
        AppStore.instance = this;

        this.state = defaultState;
    }

    // update(state: Partial<State>) {
    //     this.state = {
    //         ...this.state,
    //         ...state
    //     }
    // }
}

export const appStore = new AppStore();
