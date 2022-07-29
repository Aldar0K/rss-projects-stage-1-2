import { AppStore } from '../src/App/Store/AppStore';

describe('AppStore', () => {
    let appStore: AppStore;

    beforeEach(() => {
        appStore = new AppStore();
    });

    describe('update', () => {
        it('should change appStore cart amount and productsIds', () => {
            const newAmount = 10;
            appStore.update({
                cart: {
                    amount: newAmount,
                    productsIds: [newAmount],
                },
            });

            expect(appStore.state).not.toEqual({});
        });
    });
});
