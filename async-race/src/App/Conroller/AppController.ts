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
    const data = await this.model.getCars();

    // eslint-disable-next-line no-console
    console.log(data);

    // this.view.render(data);
  }
}

export default AppController;
