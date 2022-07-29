import { ProductsItem } from '../src/App/Components/ProductsItem/ProductsItem';

describe('ProductsItem', () => {
    describe('render', () => {
        it('should return string of dom elements - product card', () => {
            const product = {
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
            };

            const expectedString = `
            <div class="main__product${product.inCart ? ' main__product_active' : ''}" id="${product.id}">
                <h3>${product.name}</h3>
                <img src = "${product.image}" alt = "${product.name}"/>
                <span>Количество: ${product.amount}</span>
                <span>Год выхода: ${product.release}</span>
                <span>Производитель: ${product.brand}</span>
                <span>Цвет: ${product.color}</span>
                <span>Количество камер: ${product.cameras}</span>
                <span>Цена: ${product.price} рублей</span>
            </div>
            `;

            expect(new ProductsItem(product).render().trim()).toBe(expectedString.trim());
        });
    });
});
