import './sass/style.scss';
import { App } from './App/App';

console.log('Hello World!');

const app = new App();

const main = document.querySelector('.main');

if (main) {
    main.innerHTML = app.render();
}
