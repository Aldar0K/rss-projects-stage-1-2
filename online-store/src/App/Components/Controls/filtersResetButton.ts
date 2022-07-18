import { app } from '../../App';
import { resetFiltersByRange } from './filtersByRange';
import { resetFiltersByValue } from './filtersByValue';
import { resetFilterBySearch } from './searchBar';

const filterResetButton = document.querySelector('.reset-filters-button') as HTMLButtonElement;
filterResetButton.addEventListener('click', () => {
    app.productsList.resetFilters();
    resetFiltersByRange();
    resetFiltersByValue();
    resetFilterBySearch();
});
