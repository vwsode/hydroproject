(function() {
    const selects = document.querySelectorAll('.input-select');

    selects.forEach((item) => {
        const selectHead = item.querySelector('.input-select__head');
        const selectCurrentValue = item.querySelector('.input-select__current-value');
        const selectValues = item.querySelectorAll('.input-select__value');


        selectValues.forEach(value => {
            value.addEventListener('click', (event) => {
                selectCurrentValue.innerHTML = value.innerHTML;
                item.classList.remove('input-select--active');
            })
        })

        selectHead.addEventListener('click', () => {
            item.classList.toggle('input-select--active');
        })
    })
})()
