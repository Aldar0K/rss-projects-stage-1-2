import { ConfigState } from '../src/App/Interfaces/ConfigState';
import { ConfigStore } from '../src/App/Store/ConfigStore';

describe('AppStore', () => {
    let configStore: ConfigStore;

    const defaultConfigState: ConfigState = {
        search: '',
        sort: '',
        filterAmount: [0, 50],
        filterYear: [2016, 2022],
        filterBrand: [''],
        filterCameras: [''],
        filterColor: [''],
        filterInCart: false,
    };

    beforeEach(() => {
        configStore = new ConfigStore();
    });

    describe('update', () => {
        it('should change configStore state params', () => {
            const newParam = { sort: 'sortByNameAToZ' };
            configStore.update(newParam);

            expect(configStore.state).not.toEqual(defaultConfigState);
        });
    });

    describe('load', () => {
        it('should update configStore state using a value from the localStorage if there is one', () => {
            const newConfigStore: ConfigState = {
                search: '',
                sort: 'sortByNameAToZ',
                filterAmount: [45, 50],
                filterYear: [2020, 2022],
                filterBrand: [''],
                filterCameras: [''],
                filterColor: [''],
                filterInCart: true,
            };

            const newConfigStoreString = JSON.stringify(newConfigStore);
            localStorage.setItem('configStore', newConfigStoreString);

            const loadedConfig = localStorage.getItem('configStore') as string;
            const parsedConfig = JSON.parse(loadedConfig) as ConfigStore;
            expect(parsedConfig).toEqual(newConfigStore);
        });
    });
});
