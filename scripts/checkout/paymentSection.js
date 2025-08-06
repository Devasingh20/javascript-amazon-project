import { cart, resetCart } from '../../data/cart.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import { addOrders } from '../../data/orders.js';
import { products } from '../../data/products.js';
import formatPrice from '../utils/money.js';
import { renderOrderSummary } from './orderSummary.js';
import { getProduct } from '../../data/products.js';
export function renderPaymentSummary() {
  let price = 0;
  let shippingPrice = 0;
  cart.forEach((item) => {
    let matchingProduct;
    products.forEach((product) => {
      if (product.id === item.productId) {
        matchingProduct = product;
      }
    });
    price += matchingProduct.priceCents * item.quantity;
    const deliveryOption = getDeliveryOption(item.deliveryOptionId);
    shippingPrice += deliveryOption.priceCents;
  });
  const totalBeforeTax = price + shippingPrice;
  const taxCents = totalBeforeTax * 0.1;
  const totalCents = totalBeforeTax + taxCents;
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
    const product = getProduct(item.productId);

  })
  let paymentSummaryHTML = `
    <div class="payment-summary-title">
          Order Summary
        </div>

        <div class="payment-summary-row">
          <div>Items (${cartQuantity}):</div>
          <div class="payment-summary-money">$${formatPrice(price)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money">$${formatPrice(shippingPrice)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">$${formatPrice(totalBeforeTax)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">$${formatPrice(taxCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">$${formatPrice(totalCents)}</div>
        </div>

        <button class="place-order-button button-primary
        js-place-order">
          Place your order
        </button>`
  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
  if (!cart.length) {
    const button = document.querySelector('.js-place-order');
    button.style.display = 'none';

  }
  document.querySelector('.js-place-order').addEventListener('click', async () => {
    // Now show the Noty notification
    new Noty({
      type: 'success',
      layout: 'topRight',
      theme: 'metroui',
      text: '🚀Your order has been placed successfully!',
      timeout: 3000,
      progressBar: true
    }).show();
    let sound = new Audio('Ting.mp3');
    sound.play();
    try {
      const response = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          cart: cart
        })
      });
      const order = await response.json();
      addOrders(order);
    } catch (error) {
      console.log('Unexpected Error. Please try again later.')
    }
    localStorage.removeItem('cart');
    localStorage.removeItem('cartQuantity');
    renderOrderSummary();
    renderPaymentSummary();
    resetCart();
    setTimeout(() => {
      window.location.href = "orders.html";
    }, 3000)

  });

}

