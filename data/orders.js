export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrders(order) {
    orders.unshift(order);
    saveToLocalStorge();
}

function saveToLocalStorge() {
    localStorage.setItem('orders', JSON.stringify(orders));
}