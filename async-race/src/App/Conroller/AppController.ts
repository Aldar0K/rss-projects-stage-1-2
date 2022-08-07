import AppModel from '../Model/AppModel';
import AppView from '../View/AppView';

class AppController {
  model: AppModel;

  view: AppView;

  constructor(model: AppModel, view: AppView) {
    this.model = model;
    this.view = view;
  }

  async start() {
    this.model.cars = await this.model.getCars();

    console.log(this.model.cars);

    this.view.render('Garage', this.model.cars);
  }
}

export default AppController;
