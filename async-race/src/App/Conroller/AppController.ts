import ICar from '../Interfaces/ICar';
import AppModel from '../Model/AppModel';
import store from '../Store/Store';
import AppView from '../View/AppView';

class AppController {
  model: AppModel;

  view: AppView;

  constructor(model: AppModel, view: AppView) {
    this.model = model;
    this.view = view;

    this.model.bindCarsChanged(this.onModelChanged);

    this.view.bindAddCar(this.handleAddCar);

    this.onModelChanged(this.model.cars);
  }

  async start() {
    this.model.cars = await this.model.getCars();

    this.view.render(store.state.view, this.model.cars);
  }

  // async createCar(body: { name: string, color: string }) {
  //   this.model.createCar(body);
  //   this.start();
  // }

  onModelChanged = (cars: ICar[]): void => {
    this.view.render(store.state.view, cars);
  };

  handleAddCar = (body: { name: string, color: string }): void => {
    this.model.createCar(body);
  };
}

export default AppController;
