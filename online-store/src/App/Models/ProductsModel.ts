import { getProducts } from '../DB/Products.DB';
import { Product } from '../Styles/Product';

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
        return getProducts();
    }
}

export const productsModel = new ProductsModel();
