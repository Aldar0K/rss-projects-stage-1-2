import AppModel from '../Model/AppModel';
import AppView from '../View/AppView';
import store from '../Store/Store';

class AppController {
  model: AppModel;

  view: AppView;

  constructor(model: AppModel, view: AppView) {
    this.model = model;
    this.view = view;
  }

  async start() {
    const data = await this.model.fetchCars();

    // eslint-disable-next-line no-console
    console.log(data);

    // this.view.render(data);
  }
}

export default AppController;
