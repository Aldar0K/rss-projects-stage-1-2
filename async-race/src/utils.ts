import { ICar } from './Intefaces';
import store from './Store';

export const CARS_PAGE_LIMIT = 7;
export const WINNERS_PAGE_LIMIT = 10;

export const baseUrl = 'http://127.0.0.1:3000';
export const garageUrl = `${baseUrl}/garage`;
export const engineUrl = `${baseUrl}/engine`;
export const winnersUrl = `${baseUrl}/winners`;

export const producers = ['Lada', 'Acura', 'Alfa-Romeo', 'Aston-Martin', 'Audi', 'Bentley', 'BMW', 'Bugatti', 'Buick', 'Cadillac', 'Chevrolet', 'Chrysler', 'Citroen', 'Dodge', 'Ferrari', 'Fiat', 'Ford', 'Geely', 'Genesis', 'GMC', 'Honda', 'Hyundai', 'Infiniti', 'Jaguar', 'Jeep', 'Kia', 'Koenigsegg', 'Lamborghini', 'Lancia', 'Land Rover', 'Lexus', 'Lincoln', 'Lotus', 'Maserati', 'Maybach', 'Mazda', 'McLaren', 'Mercedes', 'Mini', 'Mitsubishi', 'Nissan', 'Opel', 'Pagani', 'Peugeot', 'Pontiac', 'Porsche', 'Ram', 'Renault', 'Rolls-Royce', 'Skoda', 'Smart', 'Subaru', 'Suzuki', 'Tesla', 'Toyota', 'Volkswagen', 'Volvo'];
export const models = ['Durango', 'Challenger', 'Charger', 'Grand Caravan', 'X7', 'X5', 'X3', 'X6 M', 'X6', 'X1', 'X4', 'Aircross', 'Duster', 'CR-V', 'Corolla', 'C4 Cactus', 'DS3', 'C1', 'C3', 'Crossback', 'UX 250h', 'NX 300h', 'LC 500', 'RX 350/200t', 'Rapid', 'Largus', 'IS 200t', 'LS 500h', 'RX', 'Hatchback', 'CX-5', 'Sedan', 'CX-30', 'CX-9', 'CX-3', 'Roadster', 'Phantom', 'Camry', 'Polo', 'Cullinan', 'Ghost', 'Dawn', 'Duster', 'Arkana', 'Sandero', 'Logan', 'Logan MCV', 'Captur', 'Kadjar', 'RAV4', 'Rio', 'Creta', 'Solaris'];

export const animation = (car: HTMLElement, distance: number, duration: number): Record<string, number> => {
  let start: number | null = null;
  const state: Record<string, number> = {};

  const tick = (timestamp: number) => {
    if (!start) start = timestamp;
    const time = timestamp - start;
    const passed = Math.round(time * (distance / duration));

    car.style.transform = `translateX(${Math.min(passed, distance)}px)`;

    if (passed < distance) {
      state.id = window.requestAnimationFrame(tick);
    }
  };

  state.id = window.requestAnimationFrame(tick);
  return state;
};

export const getRandomColor = (): string => {
  const chars = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += chars[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const getRandomName = (): string => {
  const producer = producers[Math.floor(Math.random() * producers.length)];
  const model = models[Math.floor(Math.random() * models.length)];
  return `${producer} ${model}`;
};

export const raceAll = async (promises: Array<Promise<{ success: boolean, id: number, time: number }>>, ids: number[]): Promise<{ carWinner: ICar, time: number }> => {
  const { success, id, time } = await Promise.race(promises);

  if (!success) {
    const failedIndex = ids.findIndex((i) => i === id);
    const restPromises = [
      ...promises.slice(0, failedIndex), ...promises.slice(failedIndex + 1, promises.length),
    ];
    const restIds = [...ids.slice(0, failedIndex), ...ids.slice(failedIndex + 1, ids.length)];
    return raceAll(restPromises, restIds);
  }

  return {
    carWinner: store.state.cars.find((car) => car.id === id) as ICar,
    time: Number((time / 1000).toFixed(2)),
  };
};

export const race = async (action: Function): Promise<{ carWinner: ICar, time: number }> => {
  const promises: Array<Promise<{ success: boolean, id: number, time: number }>> = store.state.cars.map(({ id }) => action(id));

  const winner = await raceAll(promises, store.state.cars.map((car) => car.id));

  return winner;
};
