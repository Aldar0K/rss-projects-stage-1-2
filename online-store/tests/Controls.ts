import { Controls } from '../src/App/Components/Controls/Controls';
import { ConfigStore } from '../src/App/Store/ConfigStore';

describe('Controls', () => {
    let controls: Controls;

    beforeEach(() => {
        controls = new Controls();
    });

    describe('sortByNameAToZ', () => {
        it('should change configStore sort value', () => {
            const configStore = new ConfigStore();
            controls.sortByNameAToZ();

            expect(configStore.state.sort).toBe('sortByNameAToZ');
        });
    });
});
