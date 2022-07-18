import { app } from '../../App';

const brandButtons = document.querySelectorAll('.button_brand') as NodeListOf<HTMLButtonElement>;

brandButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (!button.classList.contains('button_active')) {
            button.classList.add('button_active');
        } else {
            button.classList.remove('button_active');
        }

        const brand = button.dataset.brand as string;
        app.productsList.filterBrand(brand);
    });
});

const camerasButtons = document.querySelectorAll('.button_cameras') as NodeListOf<HTMLButtonElement>;

camerasButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (!button.classList.contains('button_active')) {
            button.classList.add('button_active');
        } else {
            button.classList.remove('button_active');
        }

        const cameras = button.dataset.cameras as string;
        app.productsList.filterCameras(cameras);
    });
});

const colorButtons = document.querySelectorAll('.button_color') as NodeListOf<HTMLButtonElement>;

colorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (!button.classList.contains('button_active')) {
            button.classList.add('button_active');
        } else {
            button.classList.remove('button_active');
        }

        const color = button.dataset.color as string;
        app.productsList.filterColor(color);
    });
});

const cartCheckBox = document.querySelector('.input-cart') as HTMLInputElement;

cartCheckBox.addEventListener('change', () => {
    app.productsList.filterInCart();
});
