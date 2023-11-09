"use strict";

const sectionProductsWrapper = document.querySelector( ".section-products__wrapper");
 
getProducts();

//получение данных из mocapi
async function getProducts() {
  try {
    const response = await fetch(
      "https://6548af90dd8ebcd4ab236544.mockapi.io/products"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const productsArray = await response.json();

    renderProducts(productsArray);
  } catch (error) {
    console.error('Ошибка при получении товаров:', error.message);
  }
}



function renderProducts(productsArray) {
  productsArray.forEach(function (item) {
    const productHTML = `<div class="section-products__card" id="${item.id}">
       <div class="section-products__card-img">
         <img src="${item.img}" alt="#" />
         <div class="section-products__card-sale">
           <p>-60%</p>
         </div>
         <button class="section-products__card-button">
           <i class="fa-solid fa-cart-shopping"></i>
         </button>
       </div>
       <div class="section-products__card-price">
         <div class="section-products__card-price__present">
           <p>${item.price}р</p>
         </div>
         <div class="section-products__card-price__past">
           <p>200р</p>
         </div>
       </div>
       <div class="section-products__card-title">
         <p>${item.title}</p>
       </div>
     </div>`;
    sectionProductsWrapper.insertAdjacentHTML("beforeend", productHTML);
  });
}
