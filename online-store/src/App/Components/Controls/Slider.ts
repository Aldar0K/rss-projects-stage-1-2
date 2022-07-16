import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

function generateSlider(element: HTMLElement, [start, end]: number[]) {
    noUiSlider.create(element, {
        start: [start, end],
        connect: true,
        range: {
            min: start,
            max: end,
        },
        step: 1,
        tooltips: true,
    });
}

const sliderAmount = document.getElementById('slider-amount') as HTMLDivElement;

generateSlider(sliderAmount, [0, 50]);

sliderAmount.style.width = '30rem';

(sliderAmount as noUiSlider.target).noUiSlider?.on('change', () => {
    const data = (sliderAmount as noUiSlider.target).noUiSlider?.get();
    console.log(data);
});
