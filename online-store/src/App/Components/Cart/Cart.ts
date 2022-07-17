import { appStore } from '../../Store/AppStore';

export class Cart {
    private amount: number;

    constructor(amount = 0) {
        this.amount = amount;
    }

    render() {
        return `
            <img src="https://www.svgrepo.com/show/80543/shopping-cart-outline.svg" alt="cart">
            <span>${this.amount}</span>
        `;
    }

    update(value: boolean) {
        if (!value) {
            this.amount++;
        } else {
            this.amount--;
        }

        (document.querySelector('.main__cart span') as HTMLSpanElement).textContent = this.amount.toString();

        appStore.update({ cart: { amount: this.amount } });
    }
}
