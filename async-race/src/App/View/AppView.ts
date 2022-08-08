import './AppView.css';
import { startDriving, stopDriving } from '../Utils/Utils';
import ICar from '../Interfaces/ICar';
import IWinner from '../Interfaces/IWinner';
// import CarsItem from './Components/CarsItem/CarsItem';
import CarsList from './Components/CarsList/CarsList';
import store from '../Store/Store';

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

    this.addListeners();
  }

  renderGarage(data: ICar[]): string {
    return `
    <wrapper class="wrapper">
      <header class="header">
        <div class="container header__container">
          <nav class="nav">
          <button clas="btn btn-garage btn-disable" disabled>TO GARAGE</button>
          <button clas="btn btn-garage btn-active">TO WINNERS</button>
          </nav>
          <h1>Async Race</h1>
        </div>
      </header>

      <main class="main">
        <div class="container main__container">
          <div class="garage">
            <div class="dashboard">
              <div class="dasboard__info">
                <h3>Garage (${store.state.carsCount})</h3>
                <h3>Page #${store.state.carsPage}</h3>
              </div>
              <div class="dashboard__controls">
                <div class="dashboard__create" id="create">
                  <input class="input create-name" id="input create-name" name="name" type="text">
                  <input class="input create-color" id="input create-name" name="color" type="color" value="#ffffff">
                  <button class="button create-button" type="submit">CREATE</button>
                </div>
                <div class="dashboard__update" id="update">
                  <input class="input update-name" id="input update-name" name="name" type="text" disabled>
                  <input class="input update-color" id="input update-name" name="color" type="color" value="#ffffff" disabled>
                  <button class="button update-button" type="submit" disabled>UPDATE</button>
                </div>
                <div class="dashboard__race">
                  <button class="button race-button" id="race">RACE</button>
                  <button class="button reset-button" id="reset">RESET</button>
                  <button class="button generator-button" id="generator">GENERATE</button>
                </div>
              </div>
            </div>
            ${(new CarsList(data)).render()}
            <div class="page-buttons">
              <button class="btn btn-garage-prev" disabled>PREV</button>
              <button class="btn btn-garage-next">NEXT</button>
            </div>
          </div>

          <div class="winners hidden"></div>
        </div>
      </main>

      <footer class="footer">
        <div class="container footer__container">
          <div class="footer__data">
            <span>©</span>
            <span>2022</span>
            <a class="github-link" href="https://github.com/Aldar0K">github</a>
          </div>
          <div class="footer__rss">
              <a class="rss-link" href="https://rs.school/js/">
                  <img src="https://rs.school/images/rs_school_js.svg" alt="rs_school_js.svg" width="120px">
              </a>
          </div>
        </div>
      </footer>
    </wrapper>
    `;
  }

  renderWinners(): string {
    return '';
  }

  bindAddCar(handler: CallableFunction): void {
    (document.querySelector('.create-button') as HTMLButtonElement).addEventListener('click', () => {
      console.log('click!');
      console.log(handler);
    });
  }

  addListeners(): void {
    (document.querySelectorAll('.btn-start-car') as NodeListOf<HTMLButtonElement>).forEach((button) => {
      button.addEventListener('click', () => {
        startDriving(Number(button.dataset.id));
      });
    });
    (document.querySelectorAll('.btn-reset-car') as NodeListOf<HTMLButtonElement>).forEach((button) => {
      button.addEventListener('click', () => {
        stopDriving(Number(button.dataset.id));
      });
    });
  }
}

export default AppView;
