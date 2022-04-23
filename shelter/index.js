// Иморт массива petsArr из файла pets.js.
import petsArr from './js/pets.js';
import Modal from './js/Modal.js';


// При загрузке странице.
window.onload = function () {
    console.log('Score: 100 / 100');

    // Проверка импортов.
    if (petsArr) {
        console.log('petsArr imported', typeof petsArr);
    }
    if (Modal) {
        console.log('Modal imported', typeof Modal);
    }

    // Generate Base Modal from Modal Class.
    addCardsClickHandler();
}


// Функция для блокировки и разблокировки скролла на странице.
function blockBody () {
    document.body.classList.toggle('body_lock');
}


// Меню бургер.
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
const menuDropout = document.querySelector('.menu__dropout');
const menuLinks = document.querySelectorAll('.menu__link');

if (iconMenu) {
   function toogleMenu () {
        menuDropout.classList.toggle('menu__dropout_active');
        iconMenu.classList.toggle('menu__icon_active');
        menuBody.classList.toggle('menu__body_active');
        blockBody();
    }

menuDropout.addEventListener('click', toogleMenu);
iconMenu.addEventListener('click', toogleMenu);
menuLinks.forEach((link) => link.addEventListener('click', toogleMenu))
}


// Попап (модальное окно).

// Добавление слушателей для карточек питомцев.
function addCardsClickHandler () {
    document.querySelectorAll('.slider__card').forEach(card => {
        card.addEventListener('click', () => {
            generatePetModal();
        })
    })
}

// Функция для рендера модальных окон питомцев в DOM.
function generatePetModal () {
    renderModalWindow('Test content for Pet Modal');
}

// Функция для рендера любых модальных окон.
function renderModalWindow (content) {
    let modal = new Modal ('pets-modal');
    modal.buildModal(content);
}