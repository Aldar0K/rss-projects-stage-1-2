import ICar from '../Interfaces/ICar';
import store from '../Store/Store';
import { garageUrl, winnersUrl, engineUrl, DEFAULT_PAGE_LIMIT, DEFAULT_PAGE } from '../Utils/Utils';

class AppModel {
  private loading = false;

  private error: Error | null = null;

  cars: ICar[];

  constructor() {
    this.fetchCars();
  }

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

  async getCars(page: number = DEFAULT_PAGE, limit = DEFAULT_PAGE_LIMIT): Promise<ICar[]> {
    const response = await fetch(`${garageUrl}?_page=${page}&_limit=${limit}`);
    const cars: Promise<ICar[]> = await response.json();

    // Можно убрать в отдельный метод.
    if (response.headers.get('X-Total-Count')) {
      store.update({
        carsCount: Number(response.headers.get('X-Total-Count')),
      });
    }

    return cars;
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
