import './CarsList.css';
import ICar from '../../../Interfaces/ICar';
import CarsItem from '../CarsItem/CarsItem';

class CarsList {
  private cars: ICar[];

  constructor(data: ICar[]) {
    this.cars = data;
  }

  render(): string {
    return `
    <div class="cars-container">
    ${this.cars
    .map((car) => new CarsItem(car))
    .map((car: CarsItem) => car.render())
    .join('')}
    </div>
    `;
  }
}

export default CarsList;
