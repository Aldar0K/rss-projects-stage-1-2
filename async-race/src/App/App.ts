import AppModel from './Model/AppModel';
import AppView from './View/AppView';
import AppController from './Conroller/AppController';

class App {
  controller: AppController;

  constructor() {
    this.controller = new AppController(new AppModel(), new AppView('Garage'));
  }

  start() {
    this.controller.start();
  }
}

export default App;
