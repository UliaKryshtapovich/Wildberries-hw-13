"use strict";

// import {headerCartBascket, headerModal, headerModalCard } from '../js/script.js';

// переменные
const headerCartBascket = document.querySelector(".header-cart");
const headerModal = document.getElementById("header-modal");
const headerModalCard = document.querySelector(".header-modal_card");
const headerModalRender = document.getElementById("header-modal_render");
const sectionProductsCardButton = document.querySelector(
  ".section-products__card-button"
);

// слушатели событий
headerCartBascket.addEventListener("click", openCart);
document.addEventListener("click", closeCartOutside);

// oткрываем модальное окно при нажатии на .header-cart
function openCart(event) {
  headerModal.style.display = "block";
  event.stopPropagation();
}

// закрываем модальное окно, если пользователь кликает за пределами окна
function closeCartOutside(event) {
  if (
    headerModal.style.display === "block" &&
    event.target !== headerModal &&
    !headerModal.contains(event.target)
  ) {
    headerModal.style.display = "none";
  }
}

// oтслеживание клика кнопки добавить в корзину на карточке
//добавление товара в корзину
window.addEventListener("click", function (event) {
  if (event.target.closest(".section-products__card-button")) {
    const cardToCart = event.target.closest(".section-products__card");

    const productInfo = {
      id: cardToCart.id,
      img: cardToCart
        .querySelector(".section-products__card-img img")
        .getAttribute("src"),
      title: cardToCart.querySelector(".section-products__card-title")
        .innerText,
      price: cardToCart.querySelector(".section-products__card-price__present")
        .innerText,
    };
    console.log(productInfo);

    const cartItemHTML = `    
      <div class="header-modal_render" id="header-modal_render">
    <div class="header-modal_render_img"> 
      <img src=${productInfo.img} alt="#">
     </div>
    <div class="header-modal_render_desc"> 
       <span class="header-modal_render_product">${productInfo.title}</span>
      <span class="header-modal_render_price">${productInfo.price}</span>
    </div>
    <div class="header-wrapper_counter"> 
    <div class="header-modal_render_counter"> 
      <button class="header-modal_render_counter__minus"> - </button>
      <span>1</span>
      <button class="header-modal_render_counter__plus"> + </button>
    </div>
  </div>
    <div class="header-modal_render_btn"> 
      <button class="header-modal_render_delete">Удалить товар</button>
    </div>
  </div>`;

    const titleElement = document.querySelector(".header-modal_title");
    titleElement.insertAdjacentHTML("afterend", cartItemHTML);

    const infoElement = document.querySelector(".header-modal_info");
    infoElement.style.display = "none";
  }
});
