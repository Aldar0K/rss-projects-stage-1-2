import ICar from '../Interfaces/ICar';
// import store from '../Store/Store';
// eslint-disable-next-line @typescript-eslint/no-unused-vars, import/no-cycle
import { garageUrl, engineUrl, DEFAULT_PAGE_LIMIT, DEFAULT_PAGE } from '../Utils/Utils';
import store from '../Store/Store';

class AppModel {
  private loading = false;

  private error: Error | null = null;

  public cars: ICar[] = [];

  onCarsChanged: Function = () => {};

  // constructor() {
  //   this.fetchCars();
  // }

  // TODO Избавиться от этого метода, либо использовать только его.
  // private fetchCars(): void {
  //   this.loading = true;
  //   this.getCars()
  //     .then((cars) => {
  //       this.cars = cars;
  //     })
  //     .catch((err) => {
  //       this.error = err;
  //     })
  //     .finally(() => {
  //       this.loading = false;
  //     });
  // }

  async getCars(page: number = DEFAULT_PAGE, limit: number = DEFAULT_PAGE_LIMIT): Promise<ICar[]> {
    const response = await fetch(`${garageUrl}?_page=${page}&_limit=${limit}`);
    const cars: Promise<ICar[]> = await response.json();

    if (response.headers.get('X-Total-Count')) {
      store.update({ carsCount: Number(response.headers.get('X-Total-Count')), carsPage: page });
    }

    return cars;
  }

  async getCar(id: number): Promise<ICar> {
    return (await fetch(`${garageUrl}/${id}`)).json();
  }

  async createCar(body: { name: string, color: string }) {
    await fetch(garageUrl, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.onCarsChanged(this.cars);
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

  static async startEngine(id: number): Promise<{ velocity: number, distance: number }> {
    return (await fetch(`${engineUrl}?id=${id}&status=started`, { method: 'PATCH' })).json();
    // return (await fetch(`${engineUrl}?id=${id}&status=started`)).json();
  }

  static async stopEngine(id: number): Promise<{ velocity: number, distance: number }> {
    return (await fetch(`${engineUrl}?id=${id}&status=stopped`, { method: 'PATCH' })).json();
    // return (await fetch(`${engineUrl}?id=${id}&status=stopped`)).json();
  }

  // TODO Определить возвращаемое тип возвращаемого значения.
  static async drive(id: number): Promise<{ success: boolean }> {
    const response = await fetch(`${engineUrl}?id=${id}&status=drive`, { method: 'PATCH' }).catch();
    return response.status !== 200 ? { success: false } : { ...(await response.json()) };
  }

  bindCarsChanged(callback: Function): void {
    this.onCarsChanged = callback;
  }
}

export default AppModel;
