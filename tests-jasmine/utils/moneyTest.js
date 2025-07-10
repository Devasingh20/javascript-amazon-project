import formatPrice from "../../scripts/utils/money.js";

describe('test suites : formatCurrency', () => {
    it('convert cents into dollers', () => {
        expect(formatPrice(2095)).toEqual('20.95')
    });
    it('work with zero(0)', () => {
        expect(formatPrice(0)).toEqual('0.00')
    });
    it('rounds upto the nearest cent',()=>{
        expect(formatPrice(2000.5)).toEqual('20.01')
    });
});