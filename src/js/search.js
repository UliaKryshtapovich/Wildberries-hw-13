document.getElementById("search").addEventListener("click", () => {
  let searchInput = document.getElementById("header-input").value.trim().toLowerCase();
  let elements = document.querySelectorAll(".section-products__card-title p");
  let cards = document.querySelectorAll(".section-products__card");

  elements.forEach((element, index) => { // поиск по элементам из массива elements
    if (element.innerText.toLowerCase() === searchInput) { // совпадает ли текст c элементом 
      cards[index].classList.remove("hide");
    } else {
      cards[index].classList.add("hide");
    }
  });
});

document.getElementById("header-input").addEventListener("keypress", function (e) {
    let key = e.which || e.keyCode; //код клавиши для разных браузеров
    if (key === 13) { 
      document.getElementById("search").click(); //вызываем обработчик click на кнопке поиска
    }
  });
