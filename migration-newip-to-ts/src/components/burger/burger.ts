import './burger.css';

const iconMenu = document.querySelector('.menu__icon') as HTMLDivElement;
const sources = document.querySelector('.sources') as HTMLDivElement;
const alpha = document.querySelector('.alpha') as HTMLDivElement;

function toogleMenu() {
    iconMenu.classList.toggle('menu__icon_active');
    sources.classList.toggle('sources_disable');
    alpha.classList.toggle('alpha_disable');
}

iconMenu.addEventListener('click', toogleMenu);

// Закрытие меню при изменении разрешения.
window.addEventListener('resize', () => {
    if (!iconMenu.classList.contains('menu__icon_active')) toogleMenu();
});
