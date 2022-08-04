import IState from '../Interfaces/IState';

const defaultState: IState = {
  carsPage: 1,
  carsIds: [],
  carsCount: 0,
  winnersPage: 1,
  winnersIds: [],
  winnersCount: 0,
  animation: {},
  view: 'Garage',
  sort: 'wins',
  order: 'asc',
};

class Store {
  static isExist: boolean;

  static instance: Store;

  public state: IState = defaultState;

  constructor() {
    if (Store.isExist) {
      // eslint-disable-next-line no-constructor-return
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
