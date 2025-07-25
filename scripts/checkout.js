// import { renderOrderSummary } from "./checkout/orderSummary.js";
// renderOrderSummary();
// import { renderPaymentSummary } from "./checkout/paymentSection.js";
// renderPaymentSummary();
// //import '../data/cart-class.js'  //this will only run all the code inside the cart-class.js file.
// //import '../data/backend-practice.js'

import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSection.js";
import { loadProducts } from "../data/products.js";
loadProducts(() => {
    renderPaymentSummary();
    renderOrderSummary();
})

