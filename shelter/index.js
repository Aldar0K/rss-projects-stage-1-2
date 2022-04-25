// Импорт массива объектов petsArr.
import petsArr from './js/pets.js';
// Импорт класса Modal.
import Modal from './js/Modal.js';
// Импорт подкласса ArticleModal.
import ArticleModal from './js/ArticleModal.js';


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
    if (ArticleModal) {
        console.log('ArticleModal imported', typeof ArticleModal);
    }

    // Добавление слушателей для карточек питомцев.
    addCardsClickHandler();

    // Добавление слушателей для кнопок слайдера.
    addSliderBtnsHandler();
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
    document.querySelectorAll('.pet-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.pet-card')) {
                let clickedCardId = e.target.closest('.pet-card').getAttribute('data-id');
                let clickedCardData = getClickedData(clickedCardId);
                
                // Рендер модального окна для объекта питомца.
                renderArticleModalWindow(clickedCardData);
            }
        })
    })
}

// Функция для поиска объекта питомца в petsArr по id.
function getClickedData (id) {
    return petsArr.find(article => article.id == id);
}

// Функция для рендера любых модальных окон в DOM.
function renderModalWindow (content) {
    let modal = new Modal ('pets-modal');
    modal.buildModal(content);
}

// Функция для рендера модальных окон питомцев в DOM.
function renderArticleModalWindow (article) {
    let modal = new ArticleModal ('article-modal', article);
    modal.renderModal();
    blockBody();
}


// Slider main page.
// Переменные для слайдера.
const slider = document.querySelector('#slider');
const btnLeft = document.querySelector("#btn-left");
const btnRight = document.querySelector("#btn-right");
const leftItem = document.querySelector('#item-left');
const rightItem = document.querySelector('#item-right');
const activeItem = document.querySelector('#item-active');

// Функция добавление слушателей для кнопок слайдера.
function addSliderBtnsHandler () {
    btnLeft.addEventListener('click', moveLeft);
    btnRight.addEventListener('click', moveRight);
}

// Функции для перелистывания слайдов.
function moveLeft () {
    slider.classList.add('transition-left');
    btnLeft.removeEventListener('click', moveLeft);
    btnRight.removeEventListener('click', moveRight);
}
function moveRight () {
    slider.classList.add('transition-right');
    btnRight.removeEventListener('click', moveRight);
    btnLeft.removeEventListener('click', moveLeft);
}

// Конец css анимации.
slider.addEventListener('animationend', (animationEvent) => {
    console.log(animationEvent);

    if (animationEvent.animationName === 'move-left') {
        slider.classList.remove('transition-left');

        activeItem.innerHTML = leftItem.innerHTML;

        leftItem.innerHTML = '';
        leftItem.innerHTML = generateSliderItemTemplate();
    } else {
        slider.classList.remove('transition-right');

        activeItem.innerHTML = rightItem.innerHTML;

        rightItem.innerHTML = '';
        rightItem.innerHTML = generateSliderItemTemplate();
    }

    addSliderBtnsHandler();
});

// Функция для создания нового элемента слайдрера.
function generateSliderItemTemplate () {
    let template = '';
    for (let i = 0; i < 3; i++) {
        template += createCardTemplate(1);
    }
    return template;
}

// Функция для создания карточки питомца (Универсальная).
function createCardTemplate (id) {
    let template = '';
    let CardData = getClickedData(id);
    template += `<div class="pet-card" data-id="${id}">`
    template += `<img class="slider__image" src=${CardData.img} width="270" height="270" alt="pet.png">`
    template += `<p class="slider__name">${CardData.name}</p>`
    template += `<button class="button button_bordered">Learn more</button>`
    template += `</div>`
    return template;
}

// Функция для получения неповторяющихся id.