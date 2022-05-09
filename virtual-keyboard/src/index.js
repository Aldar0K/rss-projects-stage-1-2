// Подключение стилей.
import './styles.css';
// TODO создать и импортировать русскую раскладку ruLayout.

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
textArea.classList.add('textarea', 'keyboard__textarea');
container.append(textArea);

// TODO Создаем блок с дополнительной информацией.

// Создаем объект клавитуры.
const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: '',
        capsLock: false
    },

    init() {
        // Создание контейнеров для клавиатуры.
        this.elements.main = document.createElement('div');
        this.elements.keysContainer = document.createElement('div');

        // Добавление классов для контейнеров
        this.elements.main.classList.add('keyboard', 'keyboard_hidden');
        this.elements.keysContainer.classList.add('keyboard__keys');
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

        // Генерация в DOM.
        this.elements.main.append(this.elements.keysContainer);
        document.body.append(this.elements.main);

        // Отслеживание всех полей ввода, связанных классом с клавиатурой.
        document.querySelectorAll('.keyboard__textarea').forEach(element => {
            element.addEventListener('focus', () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            '`','1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
            'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'del',
            'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'enter',
            'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'up', 'shift', 'done',
            'lctrl', 'win', 'lalt','space', 'ralt', 'left', 'down', 'right', 'rctrl',
        ];

        // Создание HTML иконок для некоторых клавиш.
        const createIconHTML = icon_name => {
            return `<i class="material-icons">${icon_name}</i>`
        }

        keyLayout.forEach(key => {
            // Создание DOM элемента для каждой клавиши.
            const keyElement = document.createElement('div');
            const insertLineBreak = ['backspace', 'del', 'enter', 'done'].indexOf(key) !== -1;

            // Добавление атрибутов (классов).
            keyElement.setAttribute('type', 'button');
            keyElement.classList.add('keyboard__key');

            switch (key) {
                case 'backspace':
                    keyElement.classList.add('keyboard__key_wide', 'keyboard__key_dark');
                    keyElement.innerHTML = createIconHTML('backspace');
                    keyElement.addEventListener('click', () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent('oninput');
                    });
                    break;

                case 'del':
                    keyElement.classList.add('keyboard__key_wide', 'keyboard__key_dark');
                    keyElement.innerHTML = createIconHTML('backspace');
                    keyElement.addEventListener('click', () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent('oninput');
                    });
                    break;

                case 'caps':
                    keyElement.classList.add('keyboard__key_wide', 'keyboard__key_activatable', 'keyboard__key_dark');
                    keyElement.innerHTML = createIconHTML('keyboard_capslock');
                    keyElement.addEventListener('click', () => {
                        this._toogleCapseLock();
                        keyElement.classList.toggle('keyboard__key_active', this.properties.capsLock);
                    });
                    break;

                case 'shift':
                    keyElement.classList.add('keyboard__key_wide', 'keyboard__key_dark');
                    keyElement.textContent = 'Shift';
                    keyElement.addEventListener('mousedown', () => {
                        this._toogleCapseLock();
                        keyElement.classList.toggle('keyboard__key_active', this.properties.capsLock);
                    });
                    keyElement.addEventListener('mouseup', () => {
                        this._toogleCapseLock();
                        keyElement.classList.toggle('keyboard__key_active', this.properties.capsLock);
                    });
                    break;
                    
                case 'enter':
                    keyElement.classList.add('keyboard__key_wide', 'keyboard__key_dark');
                    keyElement.innerHTML = createIconHTML('keyboard_return');
                    keyElement.addEventListener('click', () => {
                        this.properties.value += '\n';
                        this._triggerEvent('oninput');
                    });
                    break;

                case 'space':
                    keyElement.classList.add('keyboard__key_extra-wide');
                    keyElement.innerHTML = createIconHTML('space_bar');
                    keyElement.addEventListener('click', () => {
                        this.properties.value += ' ';
                        this._triggerEvent('oninput');
                    });
                    break;

                case 'done':
                    keyElement.classList.add('keyboard__key_wide', 'keyboard__key_dark');
                    keyElement.innerHTML = createIconHTML('check_circle');
                    keyElement.addEventListener('click', () => {
                        this.close();
                        this._triggerEvent('onclose');
                    });
                    break;

                case 'tab':
                    keyElement.classList.add('keyboard__key_dark');
                    keyElement.innerHTML = createIconHTML('keyboard_tab');
                    keyElement.addEventListener('click', () => {
                        this.properties.value += '    ';
                        this._triggerEvent('oninput');
                    });
                    break;

                default:
                    keyElement.textContent = key.toLowerCase();
                    keyElement.addEventListener('click', () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key;
                        this._triggerEvent('oninput');
                    });
                    break;
            }

            fragment.append(keyElement);

            if (insertLineBreak) {
                fragment.append(document.createElement('br'));
            }
        });

        return fragment;
    },

    _triggerEvent(handlerName) {
       if (typeof this.eventHandlers[handlerName] === 'function') {
           this.eventHandlers[handlerName](this.properties.value);
       }
    },

    _toogleCapseLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.innerHTML.length === 1) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    // TODO Метод для смены языка
    _switchLang(layout) {

    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || '';
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove('keyboard_hidden');
    },

    close() {
        this.properties.value = '';
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add('keyboard_hidden');
    }
}

// Создание тела клавиатуры после полной загрузки DOM.
window.addEventListener('DOMContentLoaded', () => {
    Keyboard.init();

    // TODO убрать открытие по умолчанию.
    Keyboard.open();
});



