import { app } from '../../App';

const searchBar = document.querySelector('.search-bar-input') as HTMLInputElement;

searchBar.addEventListener('input', () => {
    const value = searchBar.value;
    app.productsList.filterSearch(value);
});

export const resetFilterBySearch = (): void => {
    searchBar.value = '';
};
