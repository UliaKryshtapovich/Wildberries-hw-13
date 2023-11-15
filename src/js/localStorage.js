"use strict";

// сохранить корзину в Local Storage
export function saveCartToLocalStorage() {
  localStorage.setItem("cartSaveToLS", JSON.stringify(cartSaveToLS));
}

// из Local Storage
export function restoreCartFromLocalStorage() {
  const savedCart = localStorage.getItem("cartSaveToLS");
  if (savedCart) {
    cartSaveToLS = JSON.parse(savedCart);

    cartSaveToLS.forEach((item) => {
      addToCartUI(item);
    });
  }
}