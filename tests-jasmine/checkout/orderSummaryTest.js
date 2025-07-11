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

import { loadLocalStorage } from "../../data/cart.js";
import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
describe('test suite : renderOrderSummary', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
    beforeEach(() => {
        document.querySelector('.js-test-container').innerHTML = `
      <div class="order-summary"></div>
      <div class="js-payment-summary"></div>
      <div class="return-to-home-link"></div>
      <div class="js-delete-link"></div>
      <div class="js-update-link"></div>
      <div class="js-save-link"></div>`;
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: '1'
            }, {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId: '2'
            }]);
        });
        loadLocalStorage();
        renderOrderSummary();
    })
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






