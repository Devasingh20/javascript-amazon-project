import { cart } from "../data/cart.js";
import { getOrder } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

async function loadTracking() {
    await loadProductsFetch();

    const url = new URLSearchParams(window.location.search);
    const orderId = url.get('orderId');
    const productId = url.get('productId');

    const order = getOrder(orderId);
    const product = getProduct(productId);

    let productDetails;
    order.products.forEach((details) => {
        if (details.productId === productId) {
            productDetails = details;
        }
    })

    const today = dayjs();
    const orderTime = dayjs(order.orderTime);
    const deliveryTime = dayjs(productDetails.estimatedDeliveryTime);
    const percentProgress = ((today - orderTime) / (deliveryTime - orderTime)) * 100;

    const trackingHTML = `
<a class="back-to-orders-link link" href="orders.html">
      View all orders
    </a>
    <div class="delivery-date" style="text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);">
      Arriving on ${dayjs(productDetails.estimatedDeliveryTime).format('dddd, MMMM D')
        }
    </div>
    <div class="product-info">
      ${product.name}
    </div>
    <div class="product-info">
      Quantity: ${productDetails.quantity}
    </div>
    <img class="product-image" src="${product.image}">
    <div class="progress-labels-container">
      <div class="progress-label ${percentProgress<50?'current-status':''}">
        Preparing
      </div>
      <div class="progress-label ${
        (percentProgress >= 50 && percentProgress < 100) ? 'current-status' : ''
      }">
        Shipped
      </div> 
      <div class="progress-label ${percentProgress>=100?'current-status':''}">
        Delivered
      </div>
    </div>
    <div class="progress-bar-container">
      <div class="progress-bar" style="width: ${percentProgress}%;"></div>
    </div>`

    document.querySelector('.order-tracking').innerHTML = trackingHTML;
    console.log("Progress %:", percentProgress);
    updateCartQuantity();
}
loadTracking();
function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  })
  console.log("total quantity in cart : ", cartQuantity);
  localStorage.setItem('cartQuantity', JSON.stringify(cartQuantity));
  document.querySelector('.cart-quantity').innerHTML = cartQuantity;
}
updateCartQuantity();
