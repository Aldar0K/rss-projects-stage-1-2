import { State } from '../src/App/Interfaces/State';
import { AppStore } from '../src/App/Store/AppStore';

describe('AppStore', () => {
    let appStore: AppStore;

    beforeEach(() => {
        appStore = new AppStore();
        localStorage.clear();
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

    describe('load', () => {
        it('should call localStorage getItem method', () => {
            const newAppStore: State = {
                products: [
                    {
                        id: 1,
                        name: 'Iphone SE',
                        image: 'https://c.dns-shop.ru/thumb/st4/fit/320/250/649843d001e6208b2deb92fff1f0c9d4/54870b736f648bee41e75d8f14b0498d1ad097242a5e325d304f5002b33293fa.jpg',
                        color: 'белый',
                        brand: 'Apple',
                        cameras: '1',
                        release: 2020,
                        price: 34999,
                        amount: 20,
                        inCart: false,
                    },
                ],
                cart: {
                    productsIds: [5],
                    amount: 1,
                },
            };

            const newAppStoreString = JSON.stringify(newAppStore);
            localStorage.setItem('appStore', newAppStoreString);

            const spy = jest.spyOn(localStorage, 'getItem');

            appStore.load();
            expect(spy).toHaveBeenCalled();
        });
    });
});
