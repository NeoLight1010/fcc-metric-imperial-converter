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

    suite('convertHandler getUnit()', () => {
        test('All valid units', () => {
            assert.equal(convertHandler.getUnit('24gal'), 'gal');
            assert.equal(convertHandler.getUnit('24L'), 'L');
            assert.equal(convertHandler.getUnit('24mi'), 'mi');
            assert.equal(convertHandler.getUnit('24km'), 'km');
            assert.equal(convertHandler.getUnit('24lbs'), 'lbs');
            assert.equal(convertHandler.getUnit('24kg'), 'kg');
        });

        test('Invalid unit', () => {
            assert.equal(convertHandler.getUnit('64xis'), convertHandler.invalid_unit);
        });
    });

    suite('convertHandler getReturnUnit()', () => {
        test('All valid units', () => {
            assert.equal(convertHandler.getReturnUnit('gal'), 'L');
            assert.equal(convertHandler.getReturnUnit('L'), 'gal');
            assert.equal(convertHandler.getReturnUnit('mi'), 'km');
            assert.equal(convertHandler.getReturnUnit('km'), 'mi');
            assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
            assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
        });
    });

    suite('convertHandler spellOutUnit()', () => {
        test('All valid units', () => {
            assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
            assert.equal(convertHandler.spellOutUnit('L'), 'liters');
            assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
            assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
            assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
            assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
        });
    });

    suite('converthandler convert()', () => {
        test('gal to L', () => {
            num = 24.6;
            unit = 'gal';
            expected = 93.12109;
            assert.equal(convertHandler.convert(num, unit), expected);
        });

       test('L to gal', () => {
            num = 6;
            unit = 'L';
            expected = 1.58503;
            assert.equal(convertHandler.convert(num, unit), expected);
        });

        test('mi to km', () => {
            num = 1.5;
            unit = 'mi';
            expected = 2.57494;
            assert.equal(convertHandler.convert(num, unit), expected);
        });

        test('km to mi', () => {
            num = 1.6;
            unit = 'km';
            expected = 0.99420;
            assert.equal(convertHandler.convert(num, unit), expected);
        });

        test('lbs to kg', () => {
            num = 9;
            unit = 'lbs';
            expected = 4.08233;
            assert.equal(convertHandler.convert(num, unit), expected);
        });
        
        test('kg to lbs', () => {
            num = 7;
            unit = 'kg';
            expected = 15.43237;
            assert.equal(convertHandler.convert(num, unit), expected);
        });
    });
});