import ICar from '../Interfaces/ICar';
import store from '../Store/Store';
import { garageUrl, winnersUrl, engineUrl, DEFAULT_PAGE_LIMIT } from '../Utils/Utils';

class AppModel {
  static isExist = false;

  static instance: AppModel;

  // private cars: ICar[];

  constructor() {
    if (AppModel.isExist) {
      // eslint-disable-next-line no-constructor-return
      return AppModel.instance;
    }

    AppModel.isExist = true;
    AppModel.instance = this;

    this.getCars(store.state.carsPage, DEFAULT_PAGE_LIMIT).then((cars) => console.log(cars));
  }

  async getCars(page: number, limit = DEFAULT_PAGE_LIMIT): Promise<ICar[]> {
    const response = await fetch(`${garageUrl}?_page=${page}&_limit=${limit}`);
    const cars: Promise<ICar[]> = await response.json();

    // Можно убрать в отдельный метод.
    if (response.headers.get('X-Total-Count')) {
      store.update({
        carsCount: Number(response.headers.get('X-Total-Count')),
      });
    }

    return cars;
  }

  // createCar() {}

  // deleteCar() {}
}

export default AppModel;
