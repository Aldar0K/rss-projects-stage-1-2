import { app } from '../../App';

const select = document.querySelector('.main__sorter-select') as HTMLSelectElement;

select.addEventListener('change', () => {
    switch (select.selectedIndex) {
        case 1:
            app.productsList.sortByNameAToZ();
            break;
        case 2:
            app.productsList.sortByNameZToA();
            break;
        case 3:
            app.productsList.sortByYearMinMax();
            break;
        case 4:
            app.productsList.sortByYearMaxMin();
            break;
        case 5:
            app.productsList.sortByPriceMinMax();
            break;
        case 6:
            app.productsList.sortByPriceMaxMin();
            break;
    }
});
