import Control from "../common/control";
import { KeyboardState } from '../keyboardState';

export class Key extends Control {
    // private onInput: (char: string) => void;
    private data: string;

    constructor(parentNode: HTMLElement, data: string, protected state: KeyboardState) {
        super(parentNode);
        this.data = data;
        // this.onInput = onInput;
        this.node.textContent = data;

        this.node.onmousedown = () => {
            this.down();
        }

        this.node.onmouseup = () => {
            this.input();
            this.up();
        }
        
        this.node.onmouseenter = () => {
            
        }

        this.node.onmouseleave = () => {
            
        }
    }

    handleDown() {
        this.input(); 
        this.down();
    }

    handleUp() {
        this.up();
    }

    protected input() {
        // this.onInput(this.data);
        const state = this.state;
        state.data = {...state.data, content: state.data.content + this.data}
    }

    protected up() {}

    protected down() {}

    setData(data: string) {
        this.data = data;
        this.node.textContent = data;
    }
}
