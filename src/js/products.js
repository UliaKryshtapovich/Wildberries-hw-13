'use strict'

// const productCard = document.querySelector('.section-products__card')
const productWrapper = document.querySelector('.section-products__wrapper')
const productCard = productWrapper.closest('div')
const productCardModal = document.getElementById('products-modal')
console.log(productCardModal)
console.log(productWrapper)
console.log(productCard)

productCard.addEventListener('click', openProductCard)

function openProductCard(event) {
  productCardModal.style.display = 'block'
  console.log('dsfsdf')
  event.stopPropagation()
}
