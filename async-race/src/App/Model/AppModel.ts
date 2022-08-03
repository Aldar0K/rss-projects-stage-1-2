import ICar from '../Interfaces/ICar';

class AppModel {
  static isExist = false;

  static instance: AppModel;

  constructor() {
    if (AppModel.isExist) {
      return AppModel.instance;
    }

    AppModel.isExist = true;
    AppModel.instance = this;

    this.fetchCars();
  }

  fetchCars(): Promise<ICar[]> {
    return 
  }

  // createCar() {}

  // deleteCar() {}
}

export default AppModel;
