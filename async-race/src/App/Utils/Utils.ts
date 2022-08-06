// import ICar from '../Interfaces/ICar';

export const baseUrl = 'http://127.0.0.1:3000';
export const garageUrl = `${baseUrl}/garage`;
export const winnersUrl = `${baseUrl}/winners`;
export const engineUrl = `${baseUrl}/engine`;

export const DEFAULT_PAGE: number = 1;
export const DEFAULT_PAGE_LIMIT: number = 7;

export const producers = ['Lada', 'Acura', 'Alfa-Romeo', 'Aston-Martin', 'Audi', 'Bentley', 'BMW', 'Bugatti', 'Buick', 'Cadillac', 'Chevrolet', 'Chrysler', 'Citroen', 'Dodge', 'Ferrari', 'Fiat', 'Ford', 'Geely', 'Genesis', 'GMC', 'Honda', 'Hyundai', 'Infiniti', 'Jaguar', 'Jeep', 'Kia', 'Koenigsegg', 'Lamborghini', 'Lancia', 'Land Rover', 'Lexus', 'Lincoln', 'Lotus', 'Maserati', 'Maybach', 'Mazda', 'McLaren', 'Mercedes', 'Mini', 'Mitsubishi', 'Nissan', 'Opel', 'Pagani', 'Peugeot', 'Pontiac', 'Porsche', 'Ram', 'Renault', 'Rolls-Royce', 'Skoda', 'Smart', 'Subaru', 'Suzuki', 'Tesla', 'Toyota', 'Volkswagen', 'Volvo'];
export const models = ['Durango', 'Challenger', 'Charger', 'Grand Caravan', 'X7', 'X5', 'X3', 'X6 M', 'X6', 'X1', 'X4', 'Aircross', 'Duster', 'CR-V', 'Corolla', 'C4 Cactus', 'DS3', 'C1', 'C3', 'Crossback', 'UX 250h', 'NX 300h', 'LC 500', 'RX 350/200t', 'Rapid', 'Largus', 'IS 200t', 'LS 500h', 'RX', 'Hatchback', 'CX-5', 'Sedan', 'CX-30', 'CX-9', 'CX-3', 'Roadster', 'Phantom', 'Camry', 'Polo', 'Cullinan', 'Ghost', 'Dawn', 'Duster', 'Arkana', 'Sandero', 'Logan', 'Logan MCV', 'Captur', 'Kadjar', 'RAV4', 'Rio', 'Creta', 'Solaris'];

export const createElement = (tag: string, className?: string): HTMLElement => {
  const el = document.createElement(tag) as HTMLElement;
  if (className) el.classList.add(className);

  return el;
};

export const getElement = (selector: string): HTMLElement | undefined => {
  let el;
  if (document.querySelector(selector)) {
    el = document.querySelector(selector) as HTMLElement;
  }

  return el;
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

// export const generateRandomCars = (amount: number = 100): ICar[] => new Array(amount)
//   .fill(1)
//   .map(car => {
//     name: getRandomName();
//     color:
//   });
