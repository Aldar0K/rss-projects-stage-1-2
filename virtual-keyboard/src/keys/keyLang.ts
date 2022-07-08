import { Key } from './key'

export class KeyLang extends Key {
    protected input() {
        // this.onInput(this.data);
        const state = this.state;
        state.data = {
            ...state.data, langIndex:(state.data.langIndex + 1) % state.languages.length
        }
    }
}