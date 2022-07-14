import './sass/style.scss';
import { App } from './App/App';

console.log('Hello World!');

const app = new App();

const productsContainer = document.querySelector('.main__products') as HTMLDivElement;

productsContainer.innerHTML = app.render();
