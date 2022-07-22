import { appStore } from '../../Store/AppStore';

export class Cart {
    private amount: number;
    private productsIds: number[] = [];

    constructor(amount: number, productsIds: number[]) {
        this.amount = amount;
        this.productsIds = productsIds;
    }

    render(): string {
        return `
            <img src="https://www.svgrepo.com/show/80543/shopping-cart-outline.svg" alt="cart">
            <span>${this.amount}</span>
        `;
    }

    update(id: number): void {
        if (this.productsIds.includes(id)) {
            this.productsIds.splice(this.productsIds.indexOf(id), 1);
            this.amount--;
        } else {
            this.productsIds.push(id);
            this.amount++;
        }

        (document.querySelector('.main__cart span') as HTMLSpanElement).textContent = this.amount.toString();

        appStore.update({ cart: { amount: this.amount, productsIds: this.productsIds } });
    }
}
