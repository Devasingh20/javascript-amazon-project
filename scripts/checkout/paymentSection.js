import { cart } from '../../data/cart.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import { products } from '../../data/products.js';
import formatPrice from '../utils/money.js';
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
  console.log(price);
  console.log(shippingPrice);
  console.log(totalBeforeTax);
  console.log(taxCents.toFixed(2));
  console.log(totalCents);
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
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

        <button class="place-order-button button-primary">
          Place your order
        </button>`
  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
}