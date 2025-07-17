function Cart() {
    const cart = {
        cartItem: undefined,
        loadLocalStorage() {
            this.cartItem = JSON.parse(localStorage.getItem('cart-oop')) ||
                [{
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 2,
                    deliveryOptionId: '1'
                }, {
                    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                    quantity: 1,
                    deliveryOptionId: '2'
                }];
        },
        saveToLocalStorge() {
            localStorage.setItem('cart-oop', JSON.stringify(this.cartItem));
        },
        addToCart(productId) {
            let matchingItem;
            this.cartItem.forEach((item) => {
                if (productId === item.productId) {
                    matchingItem = item;
                }
            });
            // const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);  // comment this and below line for testing .
            // const quantity = Number(quantitySelector.value);
            if (matchingItem) {
                // matchingItem.quantity += quantity;  //comment for testing.
                matchingItem.quantity += 1;
            }
            else {
                this.cartItem.push({
                    productId: productId,
                    //quantity: quantity,  //comment for testing.
                    quantity: 1,
                    deliveryOptionId: '2'
                })
            }
            this.saveToLocalStorge();
        },
        removeFromCart(productId) {
            let newCart = [];
            this.cartItem.forEach((item) => {
                if (item.productId !== productId) {
                    newCart.push(item);
                }
            });
            this.cartItem = newCart;
            console.log("cart after removing item : ", cart);
            this.saveToLocalStorge();
        },
        updateInputQuantity(productId, newQuantity) {
            let matchingItem;
            this.cartItem.forEach((item) => {
                if (productId === item.productId) {
                    matchingItem = item;
                }
            });
            if (matchingItem) {
                matchingItem.quantity = newQuantity;
            }
            this.saveToLocalStorge();
        },
        updateDeliveryOption(productId, deliveryOptionId) {
            let matchingItem;
            this.cartItem.forEach((item) => {
                if (productId === item.productId) {
                    matchingItem = item;
                }
            });
            matchingItem.deliveryOptionId = deliveryOptionId;
            this.saveToLocalStorge();
        },
    };
    return cart
}
const cart = Cart();
cart.loadLocalStorage();
console.log(cart);
