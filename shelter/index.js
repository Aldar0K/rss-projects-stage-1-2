// Импорт массива объектов petsArr.
import petsArr from './js/pets.js';
// Импорт класса Modal.
import Modal from './js/Modal.js';
// Импорт подкласса ArticleModal.
import ArticleModal from './js/ArticleModal.js';


// Медиа-запросы
let queryDesktop = window.matchMedia("(min-width: 1280px)");
let queryLaptop = window.matchMedia("(max-width: 1279px) and (min-width: 768px");
let queryTablet = window.matchMedia("(max-width: 767px)");


// При загрузке странице.
window.onload = function () {
    console.log('Не могли бы вы проверить мою работу в последний день кросчека? Не хватило времени на пагинацию');

    // Добавление слушателей для карточек питомцев.
    addCardsClickHandler();

    // Добавление слушателей для кнопок слайдера.
    if (slider) {
        addSliderBtnsHandler();
    }

    // Добавление слушателей для кнопок пагинации, а также генерация новой пагинации.
    if (pagintaion) {
        generateNewPagination();
        addPagintationBtnsHandler();
    }
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
    menuLinks.forEach((link) => link.addEventListener('click', toogleMenu));

    // Закрытие меню при изменении разрешения.
    window.addEventListener('resize', () => {
        if (iconMenu.classList.contains("menu__icon_active")) toogleMenu();
    });
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
if (slider) {
    slider.addEventListener('animationend', (animationEvent) => {
        if (animationEvent.animationName === 'move-left-990' ||
            animationEvent.animationName === 'move-left-580' ||
            animationEvent.animationName === 'move-left-270') {
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
    
        // Добавление слушателей для кнопок слайдера.
        addSliderBtnsHandler();
        // Добавление слушателей для новых карточек питомцев.
        addCardsClickHandler();
    });
}

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


// Pagination pets page.
// Переменные для пагинации.
const pagintaion = document.querySelector('#pagination');
const pagintaionList = document.querySelector('.pagination__list');
const btnPagDblLeft = document.querySelector('#btn-dblleft');
const btnPagLeft = document.querySelector('#btn-left');
const btnPagDblRight = document.querySelector('#btn-dblright');
const btnPagRight = document.querySelector('#btn-right');
const btnPagInfo = document.querySelector('#btn-info');

// Функция добавление слушателей для кнопок слайдера.
function addPagintationBtnsHandler () {
    btnPagDblRight.addEventListener('click', lastPage);
    btnPagRight.addEventListener('click', nexPage);
}

function generatePaginationTemplate (arr, page) {
    let template = '';
    for (let i = 0; i < 8; i++) {
        template += createCardTemplate(arr[page - 1][i]);
    }
    return template;
}

// Создаем новый массив, состоящий из 6, 8 или 16 перемешанных исходных массивов (один массив для каждой страницы).
function getNewArr () {
    const newArr = [];
    if (queryDesktop.matches) {
        for (let i = 0; i < 6; i++) {
            newArr.push(getShuffleArr());
        }
    }
    
    if (queryLaptop.matches) {
        for (let i = 0; i < 8; i++) {
            newArr.push(getShuffleArr());
        }
    }
    
    if (queryTablet.matches) {
        for (let i = 0; i < 16; i++) {
            newArr.push(getShuffleArr());
        }
    }
    return newArr;
}

// Функция дял перемешки массива.
function getShuffleArr () {
    return [1, 2, 3, 4, 5, 6, 7, 8].sort(() => Math.random() - 0.5);
}

function getMaxPages () {
    let maxPages;
    if (queryDesktop.matches) {
        maxPages = 6;
    }
    
    if (queryLaptop.matches) {
        maxPages = 8;
    }
    
    if (queryTablet.matches) {
        maxPages = 16;
    }
    return maxPages;
}

// Глобальные переменные для пагинации.
let currentArr = getNewArr();
let currentPage = 1;
let Pages = getMaxPages();

// Генерация новой пагинации.
function generateNewPagination () {
    pagintaionList.innerHTML = '';
    pagintaionList.innerHTML = generatePaginationTemplate(currentArr, currentPage);

    // Добавление слушателей для новых карточек питомцев.
    addCardsClickHandler();
}

// Функции для переключения страниц.
function nexPage () {
    if (btnPagInfo.innerHTML === (Pages - 1).toString()) {
        btnPagInfo.innerHTML = +btnPagInfo.innerHTML + 1;
        btnPagDblRight.classList.add('button_disabled');
        btnPagRight.classList.add('button_disabled');
        btnPagDblRight.removeEventListener('click', lastPage);
        btnPagRight.removeEventListener('click', nexPage);
        btnPagDblLeft.addEventListener('click', firstPage);
        btnPagLeft.addEventListener('click', prevPage);
        currentPage += 1;
        generateNewPagination();
    } else {
        btnPagDblLeft.classList.remove('button_disabled');
        btnPagLeft.classList.remove('button_disabled');
        btnPagInfo.innerHTML = +btnPagInfo.innerHTML + 1;
        btnPagDblLeft.addEventListener('click', firstPage);
        btnPagLeft.addEventListener('click', prevPage);
        currentPage += 1;
        generateNewPagination();
    }
}
function lastPage () {
    btnPagInfo.innerHTML = Pages.toString();
    btnPagDblRight.classList.add('button_disabled');
    btnPagRight.classList.add('button_disabled');
    btnPagDblLeft.classList.remove('button_disabled');
    btnPagLeft.classList.remove('button_disabled');
    btnPagDblRight.removeEventListener('click', lastPage);
    btnPagRight.removeEventListener('click', nexPage);
    btnPagDblLeft.addEventListener('click', firstPage);
    btnPagLeft.addEventListener('click', prevPage);
    currentPage = Pages;
    generateNewPagination();
}
function prevPage () {
    if (btnPagInfo.innerHTML === '2') {
        btnPagInfo.innerHTML = +btnPagInfo.innerHTML - 1;
        btnPagDblLeft.classList.add('button_disabled');
        btnPagLeft.classList.add('button_disabled');
        btnPagDblLeft.removeEventListener('click', firstPage);
        btnPagLeft.removeEventListener('click', prevPage);
        currentPage -= 1;
        generateNewPagination();
    } else {
        btnPagDblRight.classList.remove('button_disabled');
        btnPagRight.classList.remove('button_disabled');
        btnPagInfo.innerHTML = +btnPagInfo.innerHTML - 1;
        btnPagDblRight.addEventListener('click', lastPage);
        btnPagRight.addEventListener('click', nexPage);
        currentPage -= 1;
        generateNewPagination();
    }
}
function firstPage () {
    btnPagInfo.innerHTML = '1';
    btnPagDblLeft.classList.add('button_disabled');
    btnPagLeft.classList.add('button_disabled');
    btnPagDblRight.classList.remove('button_disabled');
    btnPagRight.classList.remove('button_disabled');
    btnPagDblLeft.removeEventListener('click', firstPage);
    btnPagLeft.removeEventListener('click', prevPage);
    btnPagDblRight.addEventListener('click', lastPage);
    btnPagRight.addEventListener('click', nexPage);
    currentPage = 1;
    generateNewPagination();
}