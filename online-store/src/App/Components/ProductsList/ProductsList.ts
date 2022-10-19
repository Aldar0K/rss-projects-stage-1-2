import { ProductsItem } from '../ProductsItem/ProductsItem';
import { productsModel } from '../../Models/ProductsModel';
import { Product } from '../../Interfaces/Product';
import { appStore } from '../../Store/AppStore';
import { configStore } from '../../Store/ConfigStore';
import { app } from '../../App';

export class ProductsList {
  private loading = false;
  private error: Error | null = null;
  private products: Product[] = [];

  public productsContainer = document.querySelector('.main__products') as HTMLDivElement;

  constructor() {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.loading = true;
    productsModel
      .getProducts()
      .then((products) => {
        this.products = products;
      })
      .catch((error) => {
        this.error = error;
      })
      .finally(() => {
        this.loading = false;
        if (localStorage.getItem('configStore') && localStorage.getItem('appStore')) {
          configStore.load();
          appStore.load();
          this.products.forEach((product) => {
            if (appStore.state.cart.productsIds.includes(product.id)) {
              product.inCart = true;
            }
          });
        }
        app.productsList.updateHtml();
        this.productsContainer.innerHTML = this.render();
        this.addEvents();
      });
  }

  render(): string {
    return `
        ${appStore.state.products
          .map((product: Product) => new ProductsItem(product))
          .map((product: ProductsItem) => product.render())
          .join('')}
        ${this.loading ? '<p>Loading...</p>' : ''}
        ${this.error ? `<p>${this.error.message}</p>` : ''}
        `;
  }

  addEvents(): void {
    (document.querySelectorAll('.main__product') as NodeListOf<HTMLDivElement>).forEach((el) => {
      el.addEventListener('click', () => {
        if (el.classList.contains('main__product_active')) {
          el.classList.remove('main__product_active');
          this.products[Number(el.id) - 1].inCart = false;
          this.updateAppStore();
          app.cart.update(+el.id);
        } else {
          if (app.cart.amount >= 20) {
            alert('Извините, все слоты заполнены');
          } else {
            el.classList.add('main__product_active');
            this.products[Number(el.id) - 1].inCart = true;
            this.updateAppStore();
            app.cart.update(+el.id);
          }
        }
      });
    });
  }

  updateAppStore(products = this.products): void {
    appStore.update({
      products: products,
    });
  }

  updateHtml(): void {
    this.updateAppStore();

    app.controls.update();

    if (appStore.state.products.length === 0) {
      this.productsContainer.innerHTML = '<h3>Извините, совпадений не обнаружено</h3>';
    } else {
      this.productsContainer.innerHTML = this.render();
      this.addEvents();
    }
  }
}
