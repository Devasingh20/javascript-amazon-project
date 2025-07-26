// import { renderOrderSummary } from "./checkout/orderSummary.js";
// renderOrderSummary();
// import { renderPaymentSummary } from "./checkout/paymentSection.js";
// renderPaymentSummary();
// //import '../data/cart-class.js'  //this will only run all the code inside the cart-class.js file.
// //import '../data/backend-practice.js'

import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSection.js";
import { loadProducts , loadProductsFetch} from "../data/products.js";
import { loadCart } from "../data/cart.js";


// using promise.all and fetch to load products and cart before rendering order summary and payment summary
Promise.all([
    loadProductsFetch(),
    new Promise((resolve) => {
        loadCart(() => {
            resolve('Cart loaded');
        });
    })
]).then((result) => {
    console.log(result);
    renderOrderSummary();
    renderPaymentSummary();
})


//using promise.all to load products and cart (using XMLHttpRequest) before rendering order summary and payment summary
// Promise.all([
//     new Promise((resolve) => {
//         loadProducts(() => {
//             resolve('Products loaded');
//         })
//     }),
//     new Promise((resolve) => {
//         loadCart(() => {
//             resolve('Cart loaded');
//         });
//     })
// ]).then((result) => {
//     console.log(result);
//     renderOrderSummary();
//     renderPaymentSummary();
// })


//using promise to load products before rendering order summary and payment summary

// new Promise((resolve) => {
//     loadProducts(() => {
//         resolve();
//     })
// }).then(() => {
//     return new Promise((resolve) => {
//         loadCart(() => {
//             resolve();
//         });
//     })
// }).then(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
// })


// using callback to load products before rendering order summary and payment summary
// loadProducts(() => {
//     loadCart(() => {
//         renderOrderSummary();
//         renderPaymentSummary();
//     })
// })

