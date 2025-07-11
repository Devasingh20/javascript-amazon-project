import { cart, removeFromCart, updateDeliveryOption, updateInputQuantity } from '../../data/cart.js';
import { products } from '../../data/products.js';
import formatPrice from '../utils/money.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import dayjs from ' https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { renderPaymentSummary } from './paymentSection.js';
dayjs();
const today = dayjs();
const deliveryDate = today.add(7, 'day');
const dateString = deliveryDate.format('dddd, MMMM D');
console.log("Delivary date : ", dateString);
console.log(today)

export function renderOrderSummary() {
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

    const deliveryOptionId = item.deliveryOptionId;
    console.log("deliveryOptionId : ", deliveryOptionId);
    let deliveryOption = getDeliveryOption(deliveryOptionId);
    console.log("deliveryOption : ", deliveryOption);
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'day');
    const dateString = deliveryDate.format('dddd, MMMM D');

    cartHTML += `<div class="cart-item-container js-cart-item-container js-cart-${matchingProduct.id}">
          <div class="delivery-date">
            Delivery date: ${dateString}
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
              <div class="product-quantity js-quantity-${matchingProduct.id}">
                <span>
                  Quantity: <span class="quantity-label">${item.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                  Update
                </span>
                <input type="number" class="quantity-input js-cart-quantity-${matchingProduct.id}">
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
             ${deliveryOptionsHTML(matchingProduct, item)}
            </div>
          </div>
        </div>`;
  });
  document.querySelector('.order-summary').innerHTML = cartHTML;

  function deliveryOptionsHTML(matchingProduct, item) {
    let html = '';
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'day');
      const dateString = deliveryDate.format('dddd, MMMM D');
      const priceString = deliveryOption.priceCents === 0 ? 'Free' : `$${formatPrice(deliveryOption.priceCents)
        }`;
      const isChecked = deliveryOption.id === item.deliveryOptionId;
      html += `<div class= "delivery-option js-delivery-option" data-product-id="${matchingProduct.id}"
    data-delivery-option-id="${deliveryOption.id}" >
  <input type="radio" ${isChecked ? 'checked' : ''}  class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
    <div>
      <div class="delivery-option-date">   
        ${dateString}
      </div>
      <div class="delivery-option-price">
        ${priceString} - Shipping
      </div>
    </div>
  </div>`
    })
    return html;
  }
  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const productId = element.dataset.productId;
      const deliveryOptionId = element.dataset.deliveryOptionId;
      console.log("productId : ", productId);
      console.log("deliveryOptionId", deliveryOptionId);
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    })
  })
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      console.log("productId to delete : ", productId);
      removeFromCart(productId);
      const container = document.querySelector(`.js-cart-${productId}`);
      console.log(container);
      container.remove();
      renderPaymentSummary();
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
      const quantity = document.querySelector(`.js-cart-quantity-${productId}`);
      const newQuantity = Number(quantity.value);
      const quantityLabel = container.querySelector('.quantity-label');
      quantityLabel.innerText = newQuantity;
      updateInputQuantity(productId, newQuantity);
      updateCheckout();
      renderPaymentSummary();
    });
  });
}
