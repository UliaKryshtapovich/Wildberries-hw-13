'use strict';

//делегирование событий
document.addEventListener('DOMContentLoaded', function () {
    const sectionProductsWrapper = document.querySelector(".section-products__wrapper");
    const productModal = document.getElementById('products-modal');
  
    sectionProductsWrapper.addEventListener('click', function (event) {
        const clickedCardImg = event.target.closest(".section-products__card-img");
        const clickedCardButton = event.target.closest(".section-products__card-button");
        
        if (clickedCardImg && !clickedCardButton) {
        // данные о товаре из карточки
        const imgSrc = clickedCardImg.querySelector('img').src;
        const title = clickedCardImg.closest('.section-products__card').querySelector('.section-products__card-title p').innerText;
        const description = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam, natus voluptatem nulla."; 
        const price = clickedCardImg.closest('.section-products__card').querySelector('.section-products__card-price__present p').innerText;
  
        // HTML-разметка для товара
        const productHTML = `
            <div class="products-modal_img"> 
              <img src="${imgSrc}" alt="#">
            </div>
            <div class="products-modal_title">
              <span>${title}</span>
              <p>${description}</p>
              <span>${price}</span>
            </div>`;
  
        productModal.innerHTML = '';
  
        productModal.insertAdjacentHTML("beforeend", productHTML);
  
        productModal.style.display = 'flex';
      }
    });
    function closeCartOutside(event) {
        if (
            productModal.style.display === "flex" &&
            event.target !== productModal &&
            !productModal.contains(event.target) &&
            !event.target.closest('.section-products__card') 
        ) {
            productModal.style.display = "none";
        }
    }

    document.addEventListener('click', closeCartOutside);
    
  });