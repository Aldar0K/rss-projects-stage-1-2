import ICar from '../../../Interfaces/ICar';

class CarsItem {
  constructor(private car: ICar) {}

  render(): string {
    return `
    <div class="cars-container" id="${this.car.id}">
      <div class="car-params">
        <div class="car-params__top">
          <button class="btn btn-edit" data-id="${this.car.id}">Edit</button>
          <button class="btn btn-delete" data-id="${this.car.id}">Delete</button>
          <h3>${this.car.name}</h3>
        </div>
        <div class="car-params__bottom">
          <button class="btn btn-reset-car" data-id="${this.car.id}" disabled>Reset</button>
          <button class="btn btn-start-car" data-id="${this.car.id}">Start</button>
        </div>
      </div>
      <div class="racing-track">
        <div class="
      </div>
    </div>
    `;
  }
}

export default CarsItem;
