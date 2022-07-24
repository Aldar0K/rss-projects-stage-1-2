import { Cart } from '../src/App/Components/Cart/Cart';

describe('Cart', () => {
    const cart: Cart = new Cart(0, []);
    describe('render', () => {
        it('should return the string of dom elements with span attr contains amount', () => {
            const amount = 1;
            cart.amount = amount;
            const expectedString = `
            <img src="https://www.svgrepo.com/show/80543/shopping-cart-outline.svg" alt="cart">
            <span>${amount}</span>
            `;
            expect(cart.render().trim()).toBe(expectedString.trim());
        });
    });
});
