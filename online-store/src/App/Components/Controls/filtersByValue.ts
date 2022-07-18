import { app } from '../../App';

const brandButtons = document.querySelectorAll('.button_brand') as NodeListOf<HTMLButtonElement>;

brandButtons.forEach((button) => {
    button.addEventListener('click', () => {
        brandButtons.forEach((button) => button.classList.remove('button_active'));

        if (!button.classList.contains('button_active')) {
            button.classList.add('button_active');
        }

        const brand = button.dataset.brand as string;
        app.productsList.filterBrand(brand);
    });
});

const camerasButtons = document.querySelectorAll('.button_cameras') as NodeListOf<HTMLButtonElement>;

camerasButtons.forEach((button) => {
    button.addEventListener('click', () => {
        camerasButtons.forEach((button) => button.classList.remove('button_active'));

        if (!button.classList.contains('button_active')) {
            button.classList.add('button_active');
        }

        const cameras = Number(button.dataset.cameras);
        app.productsList.filterCameras(cameras);
    });
});

const colorButtons = document.querySelectorAll('.button_color') as NodeListOf<HTMLButtonElement>;

colorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        colorButtons.forEach((button) => button.classList.remove('button_active'));

        if (!button.classList.contains('button_active')) {
            button.classList.add('button_active');
        }

        const color = button.dataset.color as string;
        app.productsList.filterColor(color);
    });
});

const cartCheckBox = document.querySelector('.input-cart') as HTMLInputElement;

cartCheckBox.addEventListener('change', () => {
    if (cartCheckBox.checked) {
        app.productsList.filterInCart();
    } else {
        app.productsList.updateAppStore();
        app.productsList.updateHtml();
    }
});
