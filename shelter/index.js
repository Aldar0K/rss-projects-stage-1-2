// Score.
console.log('Score: 100 / 100');

// Меню бургер.
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
const menuDropout = document.querySelector('.menu__dropout');
const menuLinks = document.querySelectorAll('.menu__link');

if (iconMenu) {
   function toogleMenu () {
        document.body.classList.toggle('body_lock');
        menuDropout.classList.toggle('menu__dropout_active');
        iconMenu.classList.toggle('menu__icon_active');
        menuBody.classList.toggle('menu__body_active');
    }

menuDropout.addEventListener('click', toogleMenu);
iconMenu.addEventListener('click', toogleMenu);
menuLinks.forEach((link) => link.addEventListener('click', toogleMenu))
}