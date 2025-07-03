import { cart, removeFromCart, updateInputQuantity } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatPrice } from './utils/money.js';
let cartHTML = '';
cart.forEach((item) => {
  const productId = item.productId;
  let matchingProduct;
  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });
  console.log("matching product : ", matchingProduct);
  cartHTML += `<div class="cart-item-container js-cart-${matchingProduct.id}">
          <div class="delivery-date">
            Delivery date: Tuesday, June 21
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image" src="${matchingProduct.image}">

            <div class="cart-item-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-price">
                $${formatPrice(matchingProduct.priceCents)};
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label">${item.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                  Update
                </span>
                <input type="number" class="quantity-input js-quantity-${matchingProduct.id}">
                <span class="quantity-save-link link-primary js-save-link" data-product-id="${matchingProduct.id}">Save</span>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              <div class="delivery-option">
                <input type="radio" checked class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
                <div>
                  <div class="delivery-option-date">
                    Tuesday, June 21
                  </div>
                  <div class="delivery-option-price">
                    FREE Shipping
                  </div>
                </div>
              </div>
              <div class="delivery-option">
                <input type="radio" class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
                <div>
                  <div class="delivery-option-date">
                    Wednesday, June 15
                  </div>
                  <div class="delivery-option-price">
                    $4.99 - Shipping
                  </div>
                </div>
              </div>
              <div class="delivery-option">
                <input type="radio" class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
                <div>
                  <div class="delivery-option-date">
                    Monday, June 13
                  </div>
                  <div class="delivery-option-price">
                    $9.99 - Shipping
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`;
});
document.querySelector('.order-summary').innerHTML = cartHTML;

document.querySelectorAll('.js-delete-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    console.log("productId to delete : ", productId);
    removeFromCart(productId);
    const container = document.querySelector(`.js-cart-${productId}`);
    console.log(container);
    container.remove();
    updateCheckout();
  });
});
// updatedCartQuantity();
function updateCheckout() {
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });
  document.querySelector('.return-to-home-link').innerHTML = `${cartQuantity}items`;
}
updateCheckout();

document.querySelectorAll('.js-update-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    console.log(productId);
    const container = document.querySelector(`.js-cart-${productId}`);
    container.classList.add('is-editing-quantity');

  });
});

document.querySelectorAll('.js-save-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    console.log(productId);
    const container = document.querySelector(`.js-cart-${productId}`);
    container.classList.remove('is-editing-quantity');
    const quantity = document.querySelector(`.js-quantity-${productId}`);
    const newQuantity = Number(quantity.value);
    const quantityLabel = container.querySelector('.quantity-label');
    quantityLabel.innerText = newQuantity;
    updateInputQuantity(productId, newQuantity);
    updateCheckout();
  });
});
