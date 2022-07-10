import { Key } from './key';

export class KeyCapsLock extends Key {
    protected input() {
        // this.onInput(this.data);
        const state = this.state;
        state.data = {
            ...state.data, 
            caps: !state.data.caps,
        }
        if (state.data.caps) {
            this.node.classList.add('keyboar_key__down');
        } else {
            this.node.classList.remove('keyboar_key__down');
        }
    }

    protected down() {}

    protected up() {}
}
