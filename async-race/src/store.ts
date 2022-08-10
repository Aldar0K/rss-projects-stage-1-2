import { IState } from './Intefaces';

const defaultState: IState = {
  carsPage: 1,
  cars: [],
  carsCount: 0,
  winnersPage: 1,
  winners: [],
  winnersCount: 0,
  animations: {},
  view: 'Garage',
  sort: 'wins',
  order: 'ASC',
  btnPrev: false,
  btnNext: false,
};

class Store {
  static isExist: boolean;

  static instance: Store;

  public state: IState = defaultState;

  constructor() {
    if (Store.isExist) {
      return Store.instance;
    }

    Store.isExist = true;
    Store.instance = this;
  }

  update(state: Partial<IState>): void {
    this.state = {
      ...this.state,
      ...state,
    };
  }
}

const store = new Store();

export default store;
