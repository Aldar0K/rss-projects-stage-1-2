import { App } from '../src/App/App';

describe('App', () => {
    describe('start', () => {
        it('should generate dom elements', () => {
            const app = new App();
            app.start();

            document.body.innerHTML = `
            <div class="main__products"></div>
            <div class="main__cart"></div>
            `;

            expect((document.querySelector('.main__cart') as HTMLSpanElement).textContent).not.toBe('');
            expect((document.querySelector('.main__products') as HTMLSpanElement).textContent).not.toBe('');
        });
    });
});
