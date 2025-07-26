// import { renderOrderSummary } from "./checkout/orderSummary.js";
// renderOrderSummary();
// import { renderPaymentSummary } from "./checkout/paymentSection.js";
// renderPaymentSummary();
// //import '../data/cart-class.js'  //this will only run all the code inside the cart-class.js file.
// //import '../data/backend-practice.js'

import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSection.js";
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";

//using promise to load products before rendering order summary and payment summary

Promise.all([
    new Promise((resolve) => {
        loadProducts(() => {
            resolve('Products loaded');
        })
    }),
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

