import { ProductsModel } from '../src/App/Models/ProductsModel';

describe('ProductsModel', () => {
  const productsModel = new ProductsModel();

  describe('getProducts', () => {
    it('should async return an array containing the product', async () => {
      const product = {
        id: 1,
        name: 'Iphone SE',
        image:
          'https://c.dns-shop.ru/thumb/st4/fit/320/250/649843d001e6208b2deb92fff1f0c9d4/54870b736f648bee41e75d8f14b0498d1ad097242a5e325d304f5002b33293fa.jpg',
        color: 'белый',
        brand: 'Apple',
        cameras: '1',
        release: 2020,
        price: 34999,
        amount: 20,
        inCart: false,
      };

      const result = await productsModel.getProducts();
      expect(result).toContainEqual(product);
    });
  });
});
