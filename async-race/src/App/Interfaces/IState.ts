import ICar from './ICar'
import IWinner from './IWinner';

interface IState {
  carsPage: number;
  cars: Array<ICar>;
  carsCount: number;
  winnersPage: number;
  winners: Array<IWinner>;
  winnersCount: number;
  animation: {};
  view: 'Garage' | 'Winners';
  sortBy: string;
  sortOrder: string;
}

export default IState;
