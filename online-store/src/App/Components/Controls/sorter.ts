const select = document.querySelector('.main__sorter-select') as HTMLSelectElement;
console.log(select);
select.addEventListener('change', (event) => {
    console.log(event);
    // console.log(event.target);
});
