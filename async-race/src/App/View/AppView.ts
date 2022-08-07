import './AppView.css';
// import { createElement, getElement } from '../Utils/Utils';
import ICar from '../Interfaces/ICar';
import IWinner from '../Interfaces/IWinner';
// import CarsItem from './Components/CarsItem/CarsItem';
import CarsList from './Components/CarsList/CarsList';

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
          ${(new CarsList(data)).render()}
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
}

export default AppView;
