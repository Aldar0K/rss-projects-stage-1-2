import { Cart } from '../src/App/Components/Cart/Cart';
import { AppStore } from '../src/App/Store/AppStore';

describe('Cart', () => {
  let cart: Cart;

  beforeEach(() => {
    cart = new Cart(0, []);
  });

  describe('render', () => {
    it('should be defined', () => {
      expect(cart.render).toBeDefined;
    });

    it('should return the string of dom elements with span attribute contains amount', () => {
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
    beforeEach(() => {
      document.body.innerHTML = `
            <div class="main__cart">
                <span>0</span>
            </div>
            `;
      const id = 5;
      cart.update(id);
    });

    it('should be defined', () => {
      expect(cart.update).toBeDefined;
    });

    it('should change amount value in the cart instance', () => {
      expect(cart.amount).not.toBe(0);
    });

    it('should change amount value in the DOM', () => {
      expect((document.querySelector('.main__cart span') as HTMLSpanElement).textContent).not.toBe('0');
    });

    it('should change appStore cart amount and productsIds', () => {
      const appStore = new AppStore();

      expect(appStore.state.cart.amount).not.toBe(0);
      expect(appStore.state.cart.productsIds).not.toEqual([]);
    });
  });
});
