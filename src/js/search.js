document.getElementById('search').addEventListener
('click', () => {

    let searchInput = document.getElementById('header-input').value;
    let elements = document.querySelectorAll('.section-products__card-title p');
    let cards = document.querySelectorAll('.section-products__card');

    elements.forEach((element,index) => {

        if(element.innerText === searchInput){
            cards[index].classList.remove('hide');
        }
        else{
            cards[index].classList.add('hide');
        }
    });
})