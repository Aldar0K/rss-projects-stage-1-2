import './slider.css';

const sources = document.querySelector('.sources') as HTMLDivElement;
const btnLeft = document.querySelector('.arrow-left') as HTMLDivElement;
const btnRight = document.querySelector('.arrow-right') as HTMLDivElement;
let currentLeft = 0;

function slideLeft() {
    if (currentLeft < 0) {
        currentLeft += 400;
        sources.style.left = currentLeft.toString() + 'px';
    }
}

function slideRight() {
    if (currentLeft > -22000) {
        currentLeft -= 400;
        sources.style.left = currentLeft.toString() + 'px';
    }
}

btnLeft.addEventListener('click', slideLeft);
btnRight.addEventListener('click', slideRight);

window.addEventListener('resize', () => {
    currentLeft = 0;
    sources.style.left = '0px';
});
