import { Key } from './key';

export class KeyShift extends Key {
    protected input() {}

    protected down() {
        const state = this.state;
        state.data = {
            ...state.data, 
            shift: true,
        }
    }

    protected up() {
        const state = this.state;
        state.data = {
            ...state.data, 
            shift: false,
        }
    }
}
