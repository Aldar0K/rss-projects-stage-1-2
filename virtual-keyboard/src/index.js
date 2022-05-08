// Подключение стилей.
import './styles.css';

// Создаем корневой контейнер container и помещаем его в body.
const container = document.createElement('div');
container.classList.add('container');
container.id = 'container';
document.body.append(container);

// Создаем заголовок и помещаем его в container.
const heading = document.createElement('h1');
heading.textContent = 'Virtual keyboard RS School';
heading.classList.add('title');
container.append(heading);

// Создаем текстовое поле для набота текста.
const textArea = document.createElement('textarea');
textArea.classList.add('textarea');
container.append(textArea);

// Создаем блок с дополнительной информацией.
// TODO

// Создаем контейнер для клавитуры.
const keyboard = document.createElement('div');
keyboard.classList.add('keyboard');
// keyboard.classList.add('keyboard_hidden');
container.append(keyboard);

// Создаем тело клавиатуры.
const keys = document.createElement('div');
keys.classList.add('keyboard__keys');
keyboard.append(keys);

// Создаем клавиши для клавиатуры.
const symbols = ['1', '2', 'Space', '4', '5', 
'q', 'w', 'e', 'r', 'Backspace'];

for (let i = 0; i < 10; i++) {
    const key = document.createElement('button');
    key.classList.add('keyboard__key');
    key.id = i + 1;
    key.textContent = symbols[i];
    keys.append(key);
}

document.getElementById('2').textContent = 'A';


