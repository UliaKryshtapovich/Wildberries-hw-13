document.getElementById('search').addEventListener
('click', () => {

    let searchInput = document.getElementById('header-input').value;
    let elements = document.querySelectorAll('.section-products__card-title p');
    let cards = document.querySelectorAll('.section-products__card');
    let searchButton = document.getElementById('search');


    elements.forEach((element,index) => {

        if(element.innerText.toLowerCase() === searchInput){
            cards[index].classList.remove('hide');
        }
        else{
            cards[index].classList.add('hide');
        }
    });
    
    searchInput.addEventListener('keypress', function (e) {
        let key = e.which || e.keyCode;
        if (key === 13) { 
            searchButton.click();
        }
    });
})

