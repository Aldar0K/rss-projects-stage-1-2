import './AppView.css';
// import { createElement, getElement } from '../Utils/Utils';
import ICar from '../Interfaces/ICar';
import IWinner from '../Interfaces/IWinner';
import CarsItem from './Components/CarsItem/CarsItem';

type Page = 'Garage' | 'Winners';
type Data = ICar[] | IWinner[] | undefined;

class AppView {
  private currentPage: Page | undefined;

  constructor(page: Page = 'Garage') {
    this.currentPage = page;
  }

  render(page: Page, data?: Data): void {
    this.currentPage = page;

    document.body.innerHTML = page === 'Garage' ? this.renderGarage(data as ICar[]) : this.renderWinners();
  }

  renderGarage(data: ICar[]): string {
    return `
      <wrapper class="wrapper">
        <header class="header"></header>
        <main class="main">
          <div clas="cars-container">
            ${data
    .map((car) => new CarsItem(car))
    .map((car: CarsItem) => car.render())
    .join('')}
          </div>
        </main>
        <footer class="footer"></footer>
      </wrapper>
    `;
  }

  renderWinners(): string {
    return '';
  }
}

export default AppView;
