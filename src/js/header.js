"use strict";

// переменные
const headerCartBascket = document.querySelector(".header-cart");
const headerModal = document.getElementById("header-modal");
const infoElement = document.querySelector(".header-modal_info");
const titleElement = document.querySelector(".header-modal_title");
const summaryPrice = document.getElementById(".header-modal_summary_price");
let cartSaveToLS = [];

// слушатели событий
headerCartBascket.addEventListener("click", openCart);
document.addEventListener("click", closeCartOutside);

// открываем модальное окно при нажатии на .header-cart
function openCart(event) {
  headerModal.style.display = "flex";
  event.stopPropagation();
}

// закрываем модальное окно, если пользователь кликает за пределами окна
function closeCartOutside(event) {
  if (
    headerModal.style.display === "flex" &&
    event.target !== headerModal &&
    !headerModal.contains(event.target)
  ) {
    headerModal.style.display = "none";
  }
}

// итог суммы
function updateTotal() {
  let total = 0;
  const cartItems = headerModal.querySelectorAll(".header-modal_render");

  cartItems.forEach((cartItem) => {
    const priceElement = cartItem.querySelector(".header-modal_render_price");
    const priceText = priceElement.innerText;
    const priceValue = parseFloat(priceText.replace(/[^\d.]/g, ""));
    const counterElement = cartItem.querySelector("[data-counter]");
    const itemCount = parseInt(counterElement.innerText, 10) || 0;

    total += priceValue * itemCount;
    saveCartToLocalStorage();
  });

  summaryPrice.innerText = `Итог: ${total.toFixed(2)} руб.`;
  cartSaveToLS.total = total;
  saveCartToLocalStorage();

  infoElement.style.display = total === 0 ? "block" : "none";
}

// сохранениe корзины в Local Storage
function saveCartToLocalStorage() {
  localStorage.setItem("cartSaveToLS", JSON.stringify(cartSaveToLS));
}

// восстановлениe корзины из Local Storage
function restoreCartFromLocalStorage() {
  const savedCart = localStorage.getItem("cartSaveToLS");
  if (savedCart) {
    cartSaveToLS = JSON.parse(savedCart);

    cartSaveToLS.forEach((item) => {
      const cartItemHTML = `
        <div class="header-modal_render" id="${item.id}">
          <div class="header-modal_render_img"> 
            <img src=${item.img} alt="#">
          </div>
          <div class="header-modal_render_desc"> 
            <span class="header-modal_render_product">${item.title}</span>
            <span class="header-modal_render_price">${item.price}</span>
          </div>
          <div class="header-wrapper_counter"> 
            <div class="header-modal_render_counter"> 
              <div class="header-modal_render_counter__minus" data-action="minus"><i class="fa-solid fa-minus"></i></div>
              <div class="items-current" data-counter>${item.count}</div>
              <div class="header-modal_render_counter__plus" data-action="plus"><i class="fa-solid fa-plus"></i></div>
            </div>
          </div>
          <div class="header-modal_render_btn"> 
            <button class="header-modal_render_delete"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>`;

      headerModal.insertAdjacentHTML("beforeend", cartItemHTML);
    });
  }
}

// функция для добавления товара в корзину
function addToCart(productInfo) {
  const existingItem = cartSaveToLS.find((item) => item.id === productInfo.id);

  if (existingItem) {
    existingItem.count++;
  } else {
    cartSaveToLS.push({
      id: productInfo.id,
      img: productInfo.img,
      title: productInfo.title,
      price: productInfo.price,
      count: 1,
    });
  }

  saveCartToLocalStorage();
  updateTotal();
}

// oтслеживание клика кнопки добавить в корзину на карточке
window.addEventListener("click", function (event) {
  // наличие класса у события .closest-поиск ближайшего родительского элемента
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
    addToCart(productInfo);
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
    }
    event.stopPropagation();
		updateTotal();		
    saveCartToLocalStorage();
  }
  // была ли нажата кнопка удалить товар
  if (event.target.classList.contains("header-modal_render_delete")) {
    // находим ближайший родительский элемент с классом .header-modal_render
    const cardToDelete = event.target.closest(".header-modal_render");
    // удаляем карточку товара
    if (cardToDelete) {
      cardToDelete.remove();
      updateTotal();

      // oбновить массив, удаляя только выбранный товар
      cartSaveToLS = cartSaveToLS.filter((item) => item.id !== cardToDelete.id);
      saveCartToLocalStorage();
    }
  }
	  // кнопка очистить корзину		
	  if (event.target.classList.contains("header-modal_btn")) {		
	    const itemsToDelete = headerModal.querySelectorAll(".header-modal_render");		
			
	    itemsToDelete.forEach(function (item) {		
	      item.remove();		
	    });		
			
	    infoElement.style.display = "block";		
	    cartSaveToLS = []; // oчищаем корзину в массиве		
			
	    updateTotal();		
	    saveCartToLocalStorage();		
	  }
});

// восстановление корзины при загрузке страницы
restoreCartFromLocalStorage();
updateTotal();
