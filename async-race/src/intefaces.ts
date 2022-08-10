export interface ICar {
  id: number;
  name: string;
  color: string;
}

export interface IState {
  carsPage: number;
  cars: Array<ICar>;
  carsCount: number;
  winnersPage: number;
  winners: Array<IWinner>;
  winnersCount: number;
  animations: Record<string, Record<string, number>>;
  view: 'Garage' | 'Winners';
  sort: 'id' | 'wins' | 'time';
  order: 'ASC' | 'DESC';
  btnPrev: boolean;
  btnNext: boolean;
}

export interface IWinner {
  id: number;
  wins: number;
  time: number;
  car: ICar;
}
