import './sass/style.scss';
import { app } from './App/App';

console.log('Hello World!');

// const app = new App();

const productsContainer = document.querySelector('.main__products') as HTMLDivElement;

productsContainer.innerHTML = app.render();
