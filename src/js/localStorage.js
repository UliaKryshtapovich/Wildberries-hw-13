// import {cartSaveToLS,  headerModal, createCartItemHTML} from './header.js'

// // сохранить корзину в Local Storage
// export function saveCartToLocalStorage() {
//     localStorage.setItem("cartSaveToLS", JSON.stringify(cartSaveToLS));
//   }
  
//   // восстановленить корзину из Local Storage
//   export function restoreCartFromLocalStorage() {
//     const savedCart = localStorage.getItem("cartSaveToLS");
//     if (savedCart) {
//       cartSaveToLS = JSON.parse(savedCart);
  
//       cartSaveToLS.forEach((item) => {
//         const cartItemHTML = createCartItemHTML(item);
//         headerModal.insertAdjacentHTML("beforeend", cartItemHTML);
//       });
//     }
// }