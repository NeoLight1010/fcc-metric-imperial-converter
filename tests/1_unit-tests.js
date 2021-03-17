const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    suite('convertHandler getNum()', () => {
        test('Whole number', () => {
            input = '25gal';
            expected = 25;
            assert.equal(convertHandler.getNum(input), expected);
        });

        test('Decimal number', () => {
            input = '78.24gal';
            expected = 78.24;
            assert.equal(convertHandler.getNum(input), expected);
        });

       test('Fractional number', () => {
            input = '78/24gal';
            expected = 78/24;
            assert.equal(convertHandler.getNum(input), expected);
        }); 

        test('Fractional with decimal number', () => {
            input = '78/9.24gal';
            expected = 78/9.24;
            assert.equal(convertHandler.getNum(input), expected);
        });

        test('Double Fraction input', () => {
            input = '7/4/6gal';
            expected = convertHandler.invalid_number;
            assert.equal(convertHandler.getNum(input), expected);
        });

        test('No number input', () => {
            input = 'l';
            expected = 1;
            assert.equal(convertHandler.getNum(input), expected);
        });
    });
});