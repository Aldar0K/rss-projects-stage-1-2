import './alpha.css';

const alpha = document.querySelector('.alpha') as HTMLDivElement;
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

alphabet.split('').forEach((char) => {
    generateCharTemplate(char);
});

function generateCharTemplate(char: string): void {
    const charEl = document.createElement('span');
    charEl.textContent = char;
    charEl.classList.add('alpha__char');
    charEl.addEventListener('click', () => {
        selectButton(charEl);
        filterSources(char);
    });
    alpha.append(charEl);
}

function selectButton(el: HTMLElement): void {
    const chars = document.querySelectorAll('.alpha__char');
    chars.forEach((char) => {
        char.classList.remove('alpha__char_active');
    });
    el.classList.add('alpha__char_active');
}

function filterSources(char: string): void {
    const sources = document.querySelectorAll('.source__item');
    sources.forEach((el) => {
        if (el.textContent) {
            if (el.textContent.trim()[0] === char) {
                el.classList.remove('sources_disable');
            } else {
                el.classList.add('sources_disable');
            }
        }
    });
}
