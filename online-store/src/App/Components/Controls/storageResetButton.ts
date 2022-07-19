import { configStore } from '../../Store/ConfigStore';

const saveToLocalStorage = () => {
    localStorage.setItem('configStore', JSON.stringify(configStore));
};

window.addEventListener('beforeunload', saveToLocalStorage);

const storageResetButton = document.querySelector('.reset-storage-button') as HTMLButtonElement;

storageResetButton.addEventListener('click', () => {
    window.removeEventListener('beforeunload', saveToLocalStorage);
    localStorage.clear();
    location.reload();
});
