// Подключение стилей.
import './styles/styles.css';

// Создаем корневой контейнер root и помещаем его в body.
const root = document.createElement('div');
root.classList.add('root');
root.id = 'root';
document.body.append(root);

// Создаем заголовок и помещаем его в root.
const heading = document.createElement('h1');
heading.textContent = 'Virtual keyboard RS School';
root.append(heading);

// Cоздаём экземпляр класса Game без конструктора.
class Game {
    name = 'Violin Charades'
};
const myGame = new Game();

// Cоздаем параграф.
const p = document.createElement('p');
// Меняем контент на текст с несуществующим свойством класса.
p.textContent = `I like ${myGame.game}.`;
root.append(p);
