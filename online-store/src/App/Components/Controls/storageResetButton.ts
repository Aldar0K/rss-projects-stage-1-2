import { configStore } from '../../Store/ConfigStore';

const storageResetButton = document.querySelector('.reset-storage-button') as HTMLButtonElement;

storageResetButton.addEventListener('click', () => {
    configStore.update({
        search: '',
        sort: '',
        filterAmount: [0, 50],
        filterYear: [2016, 2022],
        filterBrand: [''],
        filterCameras: [''],
        filterColor: [''],
        filterInCart: false,
    });
    location.reload();
});
