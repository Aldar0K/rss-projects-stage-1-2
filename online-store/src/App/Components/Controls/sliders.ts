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
        format: {
            to: (value) => Number(value),
            from: (value) => Number(value),
        },
    });
}

const sliderAmount = document.getElementById('slider-amount') as HTMLDivElement;
const sliderYear = document.getElementById('slider-year') as HTMLDivElement;

generateSlider(sliderAmount, [0, 50]);
(sliderAmount as noUiSlider.target).noUiSlider?.on('change', () => {
    const data = (sliderAmount as noUiSlider.target).noUiSlider?.get();
    console.log(data);
});

generateSlider(sliderYear, [2016, 2022]);
(sliderYear as noUiSlider.target).noUiSlider?.on('change', () => {
    const data = (sliderYear as noUiSlider.target).noUiSlider?.get();
    console.log(data);
});
