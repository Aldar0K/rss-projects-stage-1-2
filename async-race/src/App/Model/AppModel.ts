import ICar from '../Interfaces/ICar';
// import store from '../Store/Store';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { garageUrl, winnersUrl, engineUrl, DEFAULT_PAGE_LIMIT, DEFAULT_PAGE } from '../Utils/Utils';
import store from '../Store/Store';

class AppModel {
  private loading = false;

  private error: Error | null = null;

  public cars: ICar[] = [];

  public amountOfCars: number = 0;

  constructor() {
    this.fetchCars();
  }

  // TODO Избавиться от этого метода, либо использовать только его.
  private fetchCars(): void {
    this.loading = true;
    this.getCars()
      .then((cars) => {
        this.cars = cars;
      })
      .catch((err) => {
        this.error = err;
      })
      .finally(() => {
        this.loading = false;
      });
  }

  async getCars(page: number = DEFAULT_PAGE, limit: number = DEFAULT_PAGE_LIMIT): Promise<ICar[]> {
    const response = await fetch(`${garageUrl}?_page=${page}&_limit=${limit}`);
    const cars: Promise<ICar[]> = await response.json();

    // TODO Работает ли? Если нет - заменить amountOfCars на свойство Store.
    if (response.headers.get('X-Total-Count')) {
      this.updateAmountOfCars(Number(response.headers.get('X-Total-Count')));
      store.update({ carsCount: Number(response.headers.get('X-Total-Count')), carsPage: page });
    }

    return cars;
  }

  updateAmountOfCars(value: number): void {
    this.amountOfCars = value;
  }

  async getCar(id: number): Promise<ICar> {
    return (await fetch(`${garageUrl}/${id}`)).json();
  }

  async createCar(body: object): Promise<ICar> {
    return (await fetch(garageUrl, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })).json();
  }

  async deleteCar(id: number): Promise<ICar> {
    return (await fetch(`${garageUrl}/${id}`, {
      method: 'DELETE',
    })).json();
  }

  async updateCar(id: number, body: object): Promise<ICar> {
    return (await fetch(`${garageUrl}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })).json();
  }
}

export default AppModel;
