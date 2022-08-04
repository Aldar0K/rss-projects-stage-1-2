interface IState {
  carsPage: number;
  carsIds: Array<number>;
  carsCount: number;
  winnersPage: number;
  winnersIds: Array<number>;
  winnersCount: number;
  animation: {};
  view: 'Garage' | 'Winners';
  sort: 'wins' | 'time';
  order: 'asc' | 'desc';
}

export default IState;
