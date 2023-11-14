"use strict";

// переменные
const headerCartBascket = document.querySelector(".header-cart");
const headerModal = document.getElementById("header-modal");
const infoElement = document.querySelector(".header-modal_info");
const titleElement = document.querySelector(".header-modal_title");
// headerModal.append(titleElement);
const summaryPrice = document.getElementById(".header-modal_summary_price");

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

// итог суммы
function updateTotal() {
  let total = 0;
  const cartItems = headerModal.querySelectorAll(".header-modal_render"); //находим все товары в корзине headerModal

  cartItems.forEach((cartItem) => {
    // по каждой карточки товара проходимся
    const priceElement = cartItem.querySelector(".header-modal_render_price"); // находим элемент с ценой товара
    const priceText = priceElement.innerText; // и достаем текст - сумму
    const priceValue = parseFloat(priceText.replace(/[^\d.]/g, "")); // из текста в число, удалям все символы кроме цифр и точек
    const counterElement = cartItem.querySelector("[data-counter]"); // количество товарa в корзине
    const itemCount = parseInt(counterElement.innerText, 10) || 0;

    total += priceValue * itemCount;
  });

  summaryPrice.innerText = `Итог: ${total.toFixed(2)} руб.`;
}

// oтслеживание клика кнопки добавить в корзину на карточке
window.addEventListener("click", function (event) {
  // наличие класса у цели события .closest-поиск ближайшего родительского элемента
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

    infoElement.style.display = "none";

    //проверка на дублирование товара в корзине
    const itemInCart = headerModal.querySelector(`[id="${cardToCart.id}"]`);

    // если товар есть в корзине
    if (itemInCart) {
      const counterElement = itemInCart.querySelector("[data-counter]");
      counterElement.innerText =
        (parseInt(counterElement.innerText, 10) || 0) + 1;
      counterElement.dataset.counter = counterElement.innerText;
    } else {
      // eсли товара нет в корзине, создаем новую карточку
      const cartItemHTML = `    
        <div class="header-modal_render" id="${cardToCart.id}">
        <div class="header-modal_render_img"> 
          <img src=${productInfo.img} alt="#">
        </div>
        <div class="header-modal_render_desc"> 
          <span class="header-modal_render_product">${productInfo.title}</span>
          <span class="header-modal_render_price">${productInfo.price}</span>
        </div>
        <div class="header-wrapper_counter"> 
          <div class="header-modal_render_counter"> 
            <div class="header-modal_render_counter__minus" data-action="minus"><i class="fa-solid fa-minus"></i></div>
            <div class="items-current" data-counter>1</div>
            <div class="header-modal_render_counter__plus" data-action="plus"><i class="fa-solid fa-plus"></i></div>
          </div>
        </div>
        <div class="header-modal_render_btn"> 
          <button class="header-modal_render_delete"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>`;

      headerModal.insertAdjacentHTML("beforeend", cartItemHTML);
      // titleElement.insertAdjacentHTML("beforeend", cartItemHTML);
      // titleElement.insertAdjacentHTML("afterend", cartItemHTML);
    }
    event.stopPropagation();
    updateTotal()
  }
  // была ли нажата кнопка удалить товар
  if (event.target.classList.contains("header-modal_render_delete")) {
    // находим ближайший родительский элемент с классом .header-modal_render
    const cardToDelete = event.target.closest(".header-modal_render");

    // удаляем карточку товара
    if (cardToDelete) {
      cardToDelete.remove();
      updateTotal();
      // updateLocalStorage();
    }
  }
  //  кнопка очистить корзину
  if (event.target.classList.contains("header-modal_btn")) {
    // находим все элементы .header-modal_render и удаляем их
    const itemsToDelete = headerModal.querySelectorAll(".header-modal_render");

    itemsToDelete.forEach(function (item) {
      item.remove();
    });
    infoElement.style.display = "block";
    updateTotal();
  }
  // updateLocalStorage();
});

// // обновление localStorage при изменении корзины
// function updateLocalStorage() {
//   const cartData = {
//     html: headerModal.innerHTML,
//   };
//   localStorage.setItem("cart", JSON.stringify(cartData));
// }

// const savedCart = localStorage.getItem("cart");
// if (savedCart) {
//   const parsedCart = JSON.parse(savedCart);
//   headerModal.innerHTML = parsedCart.html;
//   updateTotal();
// }
