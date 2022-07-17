import { getProducts } from '../DB/Products.DB';
import { appStore } from '../Store/AppStore';
import { Product } from '../Interfaces/Product';

export class ProductsModel {
    static isExist = false;
    static instance: ProductsModel;

    constructor() {
        if (ProductsModel.isExist) {
            return ProductsModel.instance;
        }

        ProductsModel.isExist = true;
        ProductsModel.instance = this;
    }

    getProducts(): Promise<Product[]> {
        return getProducts().then((products: Product[]) => {
            appStore.update({
                products,
            });
            return products;
        });
    }
}

export const productsModel = new ProductsModel();
