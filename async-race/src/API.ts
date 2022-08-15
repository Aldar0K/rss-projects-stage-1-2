import { ICar, IWinner } from './Intefaces';
import store from './Store';
import { garageUrl, engineUrl, winnersUrl, CARS_PAGE_LIMIT, WINNERS_PAGE_LIMIT, getRandomName, getRandomColor } from './Utils';

export const getCars = async (page: number = store.state.carsPage, limit: number = CARS_PAGE_LIMIT)
: Promise<ICar[]> => {
  const response = await fetch(`${garageUrl}?_page=${page}&_limit=${limit}`);
  const cars: Promise<ICar[]> = await response.json();

  if (response.headers.get('X-Total-Count')) {
    store.update({ carsCount: Number(response.headers.get('X-Total-Count')), carsPage: page });
  }

  return cars;
};

export const getCar = async (id: number): Promise<ICar> => (await fetch(`${garageUrl}/${id}`)).json();

export const createCar = async (body: { name: string, color: string })
: Promise<ICar> => (await fetch(garageUrl, {
  method: 'POST',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json',
  },
})).json();

export const deleteCar = async (id: number): Promise<ICar> => (await fetch(`${garageUrl}/${id}`, {
  method: 'DELETE',
})).json();

// TODO можно переделать пареметры.
export const updateCar = async (id: number, body: { name: string, color: string }): Promise<ICar> => (await fetch(`${garageUrl}/${id}`, {
  method: 'PUT',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json',
  },
})).json();

export const startEngine = async (id: number): Promise<{ velocity: number, distance: number }> => (await fetch(`${engineUrl}?id=${id}&status=started`, { method: 'PATCH' })).json();

export const stopEngine = async (id: number): Promise<{ velocity: number, distance: number }> => (await fetch(`${engineUrl}?id=${id}&status=stopped`, { method: 'PATCH' })).json();

export const drive = async (id: number): Promise<{ success: boolean }> => {
  const response = await fetch(`${engineUrl}?id=${id}&status=drive`, { method: 'PATCH' }).catch();
  return response.status !== 200 ? { success: false } : { ...(await response.json()) };
};

export const getWinners = async (page: number = 1, limit: number = WINNERS_PAGE_LIMIT, sort: 'id' | 'wins' | 'time' = 'time', order: 'ASC' | 'DESC' = 'ASC'): Promise<IWinner[]> => {
  const response = await fetch(`${winnersUrl}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`);
  const winners: Promise<IWinner[]> = await response.json();

  if (response.headers.get('X-Total-Count')) {
    store.update({ winnersCount: Number(response.headers.get('X-Total-Count')), winnersPage: page });
  }

  const extendedWinners = await Promise.all((await winners).map(async (winner) => ({
    ...winner, car: await getCar(winner.id),
  })));

  return extendedWinners;
};

export const getWinner = async (id: number): Promise<IWinner> => (await fetch(`${winnersUrl}/${id}`)).json();

export const getWinnerStatus = async (id: number) => (await fetch(`${winnersUrl}/${id}`)).status;

export const deleteWinner = async (id: number): Promise<IWinner> => (await fetch(`${winnersUrl}/${id}`, { method: 'DELETE' })).json();

export const createWinner = async (body: { id: number, wins: number, time: number })
: Promise<IWinner> => (await fetch(winnersUrl, {
  method: 'POST',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json',
  },
})).json();

export const updateWinner = async (id: number, body: { wins: number, time: number }): Promise<ICar> => (await fetch(`${winnersUrl}/${id}`, {
  method: 'PUT',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json',
  },
})).json();

export const saveWinner = async (id: number, time: number) => {
  const winnerStatus = await getWinnerStatus(id);

  if (winnerStatus === 404) {
    await createWinner({ id, wins: 1, time });
  } else {
    const winner = await getWinner(id);
    await updateWinner(id, {
      wins: winner.wins + 1,
      time: time < winner.time ? time : winner.time,
    });
  }
};

export const generateRandomCars = async (amount: number = 100): Promise<void> => {
  for (let i = 0; i < amount; i += 1) {
    await createCar({ name: getRandomName(), color: getRandomColor() });
  }
};
