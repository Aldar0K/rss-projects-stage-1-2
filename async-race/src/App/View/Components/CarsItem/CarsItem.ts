import './CarsItem.css';
import ICar from '../../../Interfaces/ICar';

class CarsItem {
  private car: ICar;

  constructor(car: ICar) {
    this.car = car;
  }

  render(): string {
    return `
    <div class="car-container" id="${this.car.id}">
      <div class="car-params">
        <div class="car-params__top">
          <button class="btn btn-edit" data-id="${this.car.id}">Edit</button>
          <h3>${this.car.name}</h3>
          <button class="btn btn-delete" data-id="${this.car.id}">Delete</button>
        </div>
        <div class="car-params__bottom">
          <button class="btn btn-reset-car" data-id="${this.car.id}" disabled>Reset</button>
          <button class="btn btn-start-car" data-id="${this.car.id}">Start</button>
        </div>
      </div>
      <div class="racing-track">
        <div class="car car-${this.car.id}" data-id="${this.car.id}">
          <svg class="svg-car" height="50px" width="100px">
        </div>
        <img clas="finish-line"></img>
      </div>
    </div>
    `;
  }
}

export default CarsItem;
