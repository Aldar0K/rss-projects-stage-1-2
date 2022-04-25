// Импорт массива объектов petsArr.
import petsArr from './js/pets.js';
// Импорт класса Modal.
import Modal from './js/Modal.js';
// Импорт подкласса ArticleModal.
import ArticleModal from './js/ArticleModal.js';


// При загрузке странице.
window.onload = function () {
    console.log('Score: 100 / 100');

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
    if (animationEvent.animationName === 'move-left') {
        slider.classList.remove('transition-left');

        rightItem.innerHTML = '';
        rightItem.innerHTML = activeItem.innerHTML;

        activeItem.innerHTML = leftItem.innerHTML;

        leftItem.innerHTML = '';
        leftItem.innerHTML = generateSliderItemTemplate();
    } else {
        slider.classList.remove('transition-right');

        leftItem.innerHTML = '';
        leftItem.innerHTML = activeItem.innerHTML;

        activeItem.innerHTML = rightItem.innerHTML;

        rightItem.innerHTML = '';
        rightItem.innerHTML = generateSliderItemTemplate();
    }

    addSliderBtnsHandler();
});

// Функция для создания нового уникального элемента слайдера.
function generateSliderItemTemplate () {
    let template = '';
    let uniqueIdsArr = getTreeUniqueIds();
    for (let i = 0; i < 3; i++) {
        template += createCardTemplate(uniqueIdsArr[i]);
    }
    return template;
}

// Функция для создания карточки питомца по id (Универсальная).
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

// Функция для получения 3x уникальных id в виде массива.
function getTreeUniqueIds () {
    let treeUniqueIds = [];
    let activeIds = getActiveIds();
    for (let i = 0; i < 3; i++) {
        let uniqueId = getRandomInRange(1, 8);
        while (activeIds.includes(uniqueId) || treeUniqueIds.includes(uniqueId)) {
            uniqueId = getRandomInRange(1, 8);
        }
        treeUniqueIds.push(uniqueId);
    }
    return treeUniqueIds;
};

// Функция для получения рандомного числа в диапазане (Универсальная).
function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция для получения массива занятых id.
function getActiveIds () {
    const activeIds = [];
    for (let i = 0; i < 3; i++) {
        activeIds.push(+activeItem.children[i].dataset.id);
    }
    return activeIds;
}