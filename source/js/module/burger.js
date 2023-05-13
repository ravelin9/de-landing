const clickBurgerMenuFunction = () => {
    const burgerButton = document.querySelector(".header-block__burger");

    burgerButton.addEventListener('click', () => {
        burgerButton.classList.toggle('header-block__burger--open');
    })

    document.addEventListener('click', e => {
        const target = e.target
        if (!target.closest('.header-block__burger')) {
            burgerButton.classList.remove('header-block__burger--open');
        }
    })

    document.addEventListener("keydown", (evt) => {
        if (evt.keyCode === 27) {
            if (burgerButton.classList.contains('header-block__burger--open')) {
                evt.preventDefault();
                burgerButton.classList.remove('header-block__burger--open');
            }
        }
    });

}

clickBurgerMenuFunction();


