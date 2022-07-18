import './sass/style.scss';
import './App/Components/Controls/filtersByRange';
import './App/Components/Controls/filtersByValue';
import './App/Components/Controls/sorters';
import './App/Components/Controls/filtersResetButton';
import './App/Components/Controls/storageResetButton';
import './App/Components/Controls/searchBar';
import { app } from './App/App';
import { configStore } from './App/Store/ConfigStore';

app.start();

window.addEventListener('beforeunload', () => {
    localStorage.setItem('configStore', JSON.stringify(configStore));
});
