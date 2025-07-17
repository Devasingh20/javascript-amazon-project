// automated test 
import formatPrice from "../scripts/utils/money.js";
console.log('test suites : formatCurrency')
//Basic test case
console.log('converts cents into Dollers($)')
if (formatPrice(2095) === '20.95') {
    console.log('passed');
}
else {
    console.log('test failed');
}

//Edge test cases
console.log('works with zero(0)')
if (formatPrice(0) === '0.00') {
    console.log('passed');
}
else {
    console.log('failed');
}

console.log('rounds upto the nearest cent')
if (formatPrice(2000.5) === '20.01') {
    console.log('passed');
}
else {
    console.log('failed');
}