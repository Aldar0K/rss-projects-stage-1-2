import { Keyboard } from './keyboard';

console.log("Hello World!");

const keyboard = new Keyboard(document.body);

(window as any).keyboard = keyboard;
