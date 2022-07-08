import { Keyboard } from './keyboard';
import { KeyboardState } from './keyboardState';

console.log("Hello World!");

const state = new KeyboardState({
    content: '',
    langIndex: 0,
});

const keyboard = new Keyboard(document.body, state);

(window as any).keyboard = keyboard;
