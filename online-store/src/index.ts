import './sass/style.scss';
import { App } from './App/App';

console.log('Hello World!');

const app = new App();

const heading = document.querySelector('h1');

if (heading) {
    heading.innerHTML = app.render();
}
