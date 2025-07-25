//without using beforeEach hook  
//   import { loadLocalStorage } from "../../data/cart.js";
// import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";

// describe('test suite : renderOrderSummary', () => {
//     it('display the cart', () => {
//         document.querySelector('.js-test-container').innerHTML = `
//       <div class="order-summary"></div>
//       <div class="js-payment-summary"></div>
//       <div class="return-to-home-link"></div>
//       <div class="js-delete-link"></div>
//       <div class="js-update-link"></div>
//       <div class="js-save-link"></div>`;
//         const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
//         const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
//         spyOn(localStorage, 'setItem');
//         spyOn(localStorage, 'getItem').and.callFake(() => {
//             return JSON.stringify([{
//                 productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
//                 quantity: 2,
//                 deliveryOptionId: '1'
//             }, {
//                 productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
//                 quantity: 1,
//                 deliveryOptionId: '2'
//             }]);
//         });
//         loadLocalStorage();
//         renderOrderSummary();
//         expect(
//             document.querySelectorAll('.js-cart-item-container').length
//         ).toEqual(2);
//         expect(
//             document.querySelector(`.js-quantity-${productId1}`).innerText
//         ).toContain('Quantity: 2');
//         expect(
//             document.querySelector(`.js-quantity-${productId2}`).innerText
//         ).toContain('Quantity: 1');
//         document.querySelector('.js-test-container').innerHTML ='';
//     });

// });

// with beforeEach hook

import { products } from "../../data/products.js";
import { loadLocalStorage } from "../../data/cart.js";
import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";

// Manually mock loadProducts
function mockLoadProducts() {
  products.length = 0; // clear any existing products
  products.push(
    {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    rating: {
      stars: 4.5,
      count: 87
    },
    priceCents: 1090,
    keywords: [
      "socks",
      "sports",
      "apparel"
    ]
  },
  {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    image: "images/products/intermediate-composite-basketball.jpg",
    name: "Intermediate Size Basketball",
    rating: {
      stars: 4,
      count: 127
    },
    priceCents: 2095,
    keywords: [
      "sports",
      "basketballs"
    ]
  },
  );
}

describe('test suite : renderOrderSummary', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeAll(() => {
    // Instead of calling the real loadProducts, use the mock
    mockLoadProducts();
  });

  beforeEach(() => {
    // Set up HTML elements expected by renderOrderSummary
    document.querySelector('.js-test-container').innerHTML = `
      <div class="order-summary"></div>
      <div class="js-payment-summary"></div>
      <div class="return-to-home-link"></div>
      <div class="js-delete-link"></div>
      <div class="js-update-link"></div>
      <div class="js-save-link"></div>`;

    // Mock localStorage with test cart data
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: '1'
        },
        {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: '2'
        }
      ]);
    });

    loadLocalStorage();
    renderOrderSummary();
  });

  it('display the cart', () => {
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);

    expect(
      document.querySelector(`.js-quantity-${productId1}`).innerText
    ).toContain('Quantity: 2');

    expect(
      document.querySelector(`.js-quantity-${productId2}`).innerText
    ).toContain('Quantity: 1');

    document.querySelector('.js-test-container').innerHTML = '';
  });
});







