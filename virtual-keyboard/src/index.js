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

// Создаем тело клавиатуры.
const keyboard = document.createElement('div');
keyboard.classList.add('keyboard');
// keyboard.classList.add('keyboard_hidden');
container.append(keyboard);

// Создаем клавиши для клавиатуры.

// Создаем блок с дополнительной информацией.
