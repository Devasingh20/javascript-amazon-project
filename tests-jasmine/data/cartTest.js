// describe("DOM mock example", function() {
//   it("mocks input field value", function() {
//     const input = document.createElement("input");
//     input.className = "js-price";
//     input.value = "50";
//     document.body.appendChild(input);

//     const result = document.querySelector(".js-price").value;
//     expect(result).toBe("50");

//     document.body.removeChild(input);
//   });
// });
import { addToCart, cart, loadLocalStorage, removeFromCart } from "../../data/cart.js";
describe('test suites : addToCart', () => {
    it('adds an existing product into cart', () => {
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '2'
            }]);
        });
        loadLocalStorage();
        console.log(localStorage.getItem('cart'));
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(2);
        expect(cart[0].deliveryOptionId).toEqual('2');
    });
    it('adds new product into cart', () => {
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        loadLocalStorage();
        console.log(localStorage.getItem('cart'));
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
        expect(cart[0].deliveryOptionId).toEqual('2');
    })
});

describe('test suite : removeFromCart',()=>{
    it('removes an existing product from the cart',()=>{
        spyOn(localStorage,'setItem');
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity:1,
                deliveryOptionId:'2'
            }]);
        });
        loadLocalStorage();
        console.log(localStorage.getItem('cart'));
        removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(0);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    })
})