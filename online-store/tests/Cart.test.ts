import { Cart } from '../src/App/Components/Cart/Cart';

describe('Cart', () => {
    let cart: Cart;

    beforeEach(() => {
        cart = new Cart(0, []);
    });

    describe('render', () => {
        it('should be defined', () => {
            expect(cart.render).toBeDefined;
        });
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

    describe('update', () => {
        it('should be defined', () => {
            expect(cart.update).toBeDefined;
        });
        it('should change amount value in the DOM', () => {
            document.body.innerHTML = `
                <div class="main__cart">
                    <span>0</span>
                </div>
            `;

            const id = 5;
            cart.update(id);

            expect((document.querySelector('.main__cart span') as HTMLSpanElement).textContent).toBe('1');
        });
    });
});
