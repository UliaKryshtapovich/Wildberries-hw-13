"use strict";

export { headerCartBascket, headerModal, headerModalCard };

// переменные
const headerCartBascket = document.querySelector(".header-cart");
const headerModal = document.getElementById("header-modal");
const headerModalCard = document.querySelector(".header-modal_card");

// слушатели событий
headerCartBascket.addEventListener("click", openCart);
document.addEventListener("click", closeCartOutside);

// oткрываем модальное окно при нажатии на .header-cart
function openCart(event) {
    headerModal.style.display = "block";
    event.stopPropagation(); // Эта строка предотвращает всплытие события, чтобы не вызывать `closeCartOutside` сразу же после открытия
  }
  

// закрываем модальное окно, если пользователь кликает за пределами окна
function closeCartOutside(event) {
    if (headerModal.style.display === "block" && event.target !== headerModal && !headerModal.contains(event.target)) {
      headerModal.style.display = "none";
    }
    
  }
  
  
