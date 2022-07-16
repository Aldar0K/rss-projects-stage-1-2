import './sass/style.scss';
import { App } from './App/App';
import './App/Components/Controls/Filters/sliders';

const productsContainer = document.querySelector('.main__products') as HTMLDivElement;
const app = new App();
productsContainer.innerHTML = app.render();
