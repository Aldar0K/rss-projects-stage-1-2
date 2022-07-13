import { Product } from "../Styles/Product";

const Products: Product[] = [
    {
        id: 1,
        name: 'Iphone SE',
        image: 'https://c.dns-shop.ru/thumb/st4/fit/320/250/649843d001e6208b2deb92fff1f0c9d4/54870b736f648bee41e75d8f14b0498d1ad097242a5e325d304f5002b33293fa.jpg',
        color: 'белый',
        brand: 'Apple',
        cameras: 1,
        release: 2020,
        price: 34999,
        amount: 20,
        inCart: false
    },
    {
        id: 2,
        name: 'Iphone 11',
        image: 'https://c.dns-shop.ru/thumb/st4/fit/320/250/5ef9eea7f485e30580e696e2d502a6f2/c73ffa461d078b4e3ca4d0e4f07d308e25454ea93097bb20be535b0dd72dac58.jpg',
        color: 'белый',
        brand: 'Apple',
        cameras: 2,
        release: 2019,
        price: 59999,
        amount: 8,
        inCart: false
    },
    {
        id: 3,
        name: 'Iphone Xr',
        image: 'https://c.dns-shop.ru/thumb/st4/fit/320/250/e06a5beffad8d676f1682ae8f753021a/785360b3c4ddf8b949f5ca52d936e36ab825046e5b03c6c9de0190fb7f74ae61.jpg',
        color: 'красный',
        brand: 'Apple',
        cameras: 1,
        release: 2018,
        price: 52999,
        amount: 11,
        inCart: false
    },
    {
        id: 4,
        name: 'Iphone Xs',
        image: 'https://c.dns-shop.ru/thumb/st1/fit/320/250/9b87aac9c895b93680c6992e28bdec79/c83f91b581a4d23192f3e6ca9797fee15a45daa5eb30da99a6b9a5612b8331ce.jpg',
        color: 'золотистый',
        brand: 'Apple',
        cameras: 2,
        release: 2018,
        price: 79999,
        amount: 4,
        inCart: false
    },
    {
        id: 5,
        name: 'Iphone 12',
        image: 'https://c.dns-shop.ru/thumb/st4/fit/320/250/2090e92ea2247aba5f32b70eaf4f9ba6/c835cc60027fb5c55ce95e766ae349d06a6c4de26b0adf019dd4c6df16daa736.jpg',
        color: 'черный',
        brand: 'Apple',
        cameras: 2,
        release: 2020,
        price: 69999,
        amount: 5,
        inCart: false
    },
    {
        id: 6,
        name: 'Iphone 7',
        image: 'https://c.dns-shop.ru/thumb/st4/fit/320/250/4968771324272602bdf545f58a96a0ed/9f7d73ba14a6ce0c453b2c26414ff38baba910c426d01d394b4a057d515e20e1.jpg',
        color: 'черный',
        brand: 'Apple',
        cameras: 1,
        release: 2016,
        price: 28999,
        amount: 14,
        inCart: false
    },
    {
        id: 7,
        name: 'Xiaomi 11 Lite',
        image: 'https://c.dns-shop.ru/thumb/st1/fit/320/250/1ddeaf69198826f3593f8554049ba7f9/2d85eb92dc0660c989a1930390b113f4d85cc8251c85da3d790f6df85df86900.jpg',
        color: 'черный',
        brand: 'Xiaomi',
        cameras: 3,
        release: 2021,
        price: 28999,
        amount: 17,
        inCart: false
    },
    {
        id: 8,
        name: 'Xiaomi 11T',
        image: 'https://c.dns-shop.ru/thumb/st4/fit/320/250/7919e7b77ee4f37bde5ea481344f56ea/77b0ee23dbdc8951672d9c1596b785897607a7466d6694f543d557ffd53291b3.jpg',
        color: 'серый',
        brand: 'Xiaomi',
        cameras: 3,
        release: 2021,
        price: 29999,
        amount: 12,
        inCart: false
    },
    {
        id: 9,
        name: 'Xiaomi Redmi 9A',
        image: 'https://c.dns-shop.ru/thumb/st4/fit/320/250/2cc6f9febc18c24390f22af7409067c7/d33b77752b9d72727c5f4d363fb99bf46b2829c82c97f133bfc220ffd399428d.jpg',
        color: 'голубой',
        brand: 'Xiaomi',
        cameras: 1,
        release: 2020,
        price: 7999,
        amount: 35,
        inCart: false
    },
    {
        id: 10,
        name: 'Xiaomi Redmi Note 11',
        image: 'https://c.dns-shop.ru/thumb/st4/fit/320/250/2cc6f9febc18c24390f22af7409067c7/d33b77752b9d72727c5f4d363fb99bf46b2829c82c97f133bfc220ffd399428d.jpg',
        color: 'черный',
        brand: 'Xiaomi',
        cameras: 3,
        release: 2022,
        price: 33999,
        amount: 16,
        inCart: false
    },
    {
        id: 11,
        name: 'Xiaomi Redmi 9C',
        image: 'https://c.dns-shop.ru/thumb/st4/fit/320/250/dc22e293bbf9f9ddd7cbaeb077af4b0e/7c3990dbcc2b24d5d34b3d995fc5004149a34b6663be86ed1e9cdb7980a729c0.jpg',
        color: 'серый',
        brand: 'Xiaomi',
        cameras: 2,
        release: 2020,
        price: 9999,
        amount: 26,
        inCart: false
    },
    {
        id: 12,
        name: 'Xiaomi 12 Lite',
        image: 'https://c.dns-shop.ru/thumb/st1/fit/320/250/70aa8ed67349ea50a80136114211356a/43440638ee95ffa42379c7d99151814bbc6066c6846336beab5729e45676b739.jpg',
        color: 'розовый',
        brand: 'Xiaomi',
        cameras: 3,
        release: 2022,
        price: 38999,
        amount: 7,
        inCart: false
    },
    {
        id: 13,
        name: 'Samsung Galaxy S20 FE',
        image: 'https://c.dns-shop.ru/thumb/st4/fit/320/250/033db16889aff1985e964802fd42c7cb/c0722178ce2943495e329d13b2438eede2de87bc268df9f6e07351931e8cfb2d.jpg',
        color: 'синий',
        brand: 'Samsung',
        cameras: 3,
        release: 2020,
        price: 44999,
        amount: 6,
        inCart: false
    },
    {
        id: 14,
        name: 'Samsung Galaxy A02',
        image: 'https://c.dns-shop.ru/thumb/st4/fit/320/250/df915f03162b0a9328b370a4ecfbb839/1ef62859840ecd2c895fee920c4ddf6f2b1f4ee3ce4164c9141fde9eea447324.jpg',
        color: 'красный',
        brand: 'Samsung',
        cameras: 2,
        release: 2021,
        price: 8999,
        amount: 17,
        inCart: false
    },
    {
        id: 15,
        name: 'Samsung Galaxy A03s',
        image: 'https://c.dns-shop.ru/thumb/st1/fit/320/250/58e554ddf7e5f5123026589c1bba06b8/22bfd8f5b7a9ca508f33f5bacf376e692a4afdeb211cfdf08c7e0556de2e6d81.jpg',
        color: 'черный',
        brand: 'Samsung',
        cameras: 3,
        release: 2021,
        price: 10999,
        amount: 12,
        inCart: false
    },
    {
        id: 16,
        name: 'Samsung Galaxy A13',
        image: 'https://c.dns-shop.ru/thumb/st4/fit/320/250/283a8f13cbfddf462d5b0989a91795f6/db8193f74f9a756afefbc443b4a21e53a413d66c64ea1daf7aeff5d991b3d87a.jpg',
        color: 'белый',
        brand: 'Samsung',
        cameras: 3,
        release: 2022,
        price: 15999,
        amount: 8,
        inCart: false
    },
    {
        id: 17,
        name: 'Samsung Galaxy A22S',
        image: 'https://c.dns-shop.ru/thumb/st1/fit/320/250/79ad51911493637406096b06472c63d3/e4aaa5bd688be98acd1221ef624eacf9b5c626cc8e84fe9bc9d29b1576e714b6.jpg',
        color: 'черный',
        brand: 'Samsung',
        cameras: 3,
        release: 2021,
        price: 19999,
        amount: 4,
        inCart: false
    },
    {
        id: 18,
        name: 'Samsung Galaxy A22',
        image: 'https://c.dns-shop.ru/thumb/st1/fit/320/250/62edb6f40496752c3aa191e7a26f576e/b7e83c6520fca6f9da0a663acd6f93b6b85f31070dd242715a87dcce51c1349f.jpg',
        color: 'зеленый',
        brand: 'Samsung',
        cameras: 3,
        release: 2021,
        price: 21499,
        amount: 3,
        inCart: false
    },
    {
        id: 19,
        name: 'HUAWEI Y5p',
        image: 'https://c.dns-shop.ru/thumb/st1/fit/320/250/f53c59a7ebd5c1f1b3dba3fc200f1cb9/9af8b65ece4aba3346f0b405a38a2a323f6ce68ae47e468d78dac430f6725986.jpg',
        color: 'зеленый',
        brand: 'HUAWEI',
        cameras: 2,
        release: 2020,
        price: 8999,
        amount: 5,
        inCart: false
    },
    {
        id: 20,
        name: 'HUAWEI P smart',
        image: 'https://c.dns-shop.ru/thumb/st1/fit/320/250/28faad4394cdc1e0d9f36cec2a71b6d1/2c579a485826fc0fa55abf7125da1bfb3f2e0425fd431ce56c1167ec17211079.jpg',
        color: 'зеленый',
        brand: 'HUAWEI',
        cameras: 3,
        release: 2020,
        price: 17999,
        amount: 8,
        inCart: false
    },
    {
        id: 21,
        name: 'HUAWEI nova Y70',
        image: 'https://c.dns-shop.ru/thumb/st1/fit/320/250/b3a90f15b872c06d16dc53566d2e66ae/aaf123db76f911a1da90e9ec77ed6af6946fbab354ebcc4698a6efd6585d3a0b.jpg',
        color: 'зеленый',
        brand: 'HUAWEI',
        cameras: 2,
        release: 2022,
        price: 18999,
        amount: 9,
        inCart: false
    },
    {
        id: 22,
        name: 'HUAWEI P50 Pro',
        image: 'https://c.dns-shop.ru/thumb/st1/fit/320/250/6417c9735a96bd6f0f9386e14ea76de6/e1bbe0eee27904726b5df4b5916b3ddd9fdaffa765e3c23cd853ddf22b32092b.jpg',
        color: 'черный',
        brand: 'HUAWEI',
        cameras: 3,
        release: 2022,
        price: 89999,
        amount: 2,
        inCart: false
    },
    {
        id: 23,
        name: 'HUAWEI P50 Pocket',
        image: 'https://c.dns-shop.ru/thumb/st1/fit/320/250/f53c59a7ebd5c1f1b3dba3fc200f1cb9/9af8b65ece4aba3346f0b405a38a2a323f6ce68ae47e468d78dac430f6725986.jpg',
        color: 'золотистый',
        brand: 'HUAWEI',
        cameras: 3,
        release: 2022,
        price: 129999,
        amount: 1,
        inCart: false
    },
    {
        id: 24,
        name: 'HUAWEI nova 9 SE',
        image: 'https://c.dns-shop.ru/thumb/st1/fit/320/250/f53c59a7ebd5c1f1b3dba3fc200f1cb9/9af8b65ece4aba3346f0b405a38a2a323f6ce68ae47e468d78dac430f6725986.jpg',
        color: 'голубой',
        brand: 'HUAWEI',
        cameras: 2,
        release: 2022,
        price: 24999,
        amount: 8,
        inCart: false
    },
]

export const getProducts = (): Promise<Product[]> => {
    return new Promise<Product[]>((resolve) => {
        setTimeout(() => {
            resolve(Products);
        }, 2000);
    });
}
