const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    suite('Function convertHandler.getNum(input)', () => {
        test('Whole number input', (done) => {
            input = '25gal';
            expected = 25;
            assert.equal(convertHandler.getNum(input), expected);
            done();
        });

        test('Decimal Input', (done) => {
            input = '78.24gal';
            expected = 78.24;
            assert.equal(convertHandler.getNum(input), expected);
            done();
        });

       test('Fractional Input', (done) => {
            input = '78/24gal';
            expected = 78/24;
            assert.equal(convertHandler.getNum(input), expected);
            done();
        }); 

        test('Fractional Input w/ Decimal', (done) => {
            input = '78/9.24gal';
            expected = 78/9.24;
            assert.equal(convertHandler.getNum(input), expected);
            done();
        });

        test('Invalid Input (double fraction)', (done) => {
            input = '7/4/6gal';
            expected = convertHandler.invalid_number;
            assert.equal(convertHandler.getNum(input), expected);
            done();
        });

        test('No numerical input', (done) => {
            input = 'l';
            expected = 1;
            assert.equal(convertHandler.getNum(input), expected);
            done();
        });
    });

    suite('Function convertHandler.getUnit(input)', () => {
        test('For Each Valid Unit Inputs', (done) => {
            assert.equal(convertHandler.getUnit('24gal'), 'gal');
            assert.equal(convertHandler.getUnit('24L'), 'L');
            assert.equal(convertHandler.getUnit('24mi'), 'mi');
            assert.equal(convertHandler.getUnit('24km'), 'km');
            assert.equal(convertHandler.getUnit('24lbs'), 'lbs');
            assert.equal(convertHandler.getUnit('24kg'), 'kg');
            done();
        });

        test('Unknown Unit Input', (done) => {
            assert.equal(convertHandler.getUnit('64xis'), convertHandler.invalid_unit);
            done();
        });
    });

    suite('Function convertHandler.getReturnUnit(initUnit)', () => {
        test('For Each Valid Unit Inputs', (done) => {
            assert.equal(convertHandler.getReturnUnit('gal'), 'L');
            assert.equal(convertHandler.getReturnUnit('L'), 'gal');
            assert.equal(convertHandler.getReturnUnit('mi'), 'km');
            assert.equal(convertHandler.getReturnUnit('km'), 'mi');
            assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
            assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
            done();
        });
    });

    suite('Function convertHandler.spellOutUnit(unit)', () => {
        test('For Each Valid Unit Inputs', (done) => {
            assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
            assert.equal(convertHandler.spellOutUnit('L'), 'liters');
            assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
            assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
            assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
            assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
            done();
        });
    });

    suite('Function converthandler.convert(num, unit)', () => {
        test('Gal to L', (done) => {
            num = 24.6;
            unit = 'gal';
            expected = 93.12109;
            assert.equal(convertHandler.convert(num, unit), expected);
            done();
        });

       test('L to Gal', (done) => {
            num = 6;
            unit = 'L';
            expected = 1.58503;
            assert.equal(convertHandler.convert(num, unit), expected);
            done();
        });

        test('Mi to Km', (done) => {
            num = 1.5;
            unit = 'mi';
            expected = 2.41401;
            assert.equal(convertHandler.convert(num, unit), expected);
            done();
        });

        test('Km to Mi', (done) => {
            num = 1.6;
            unit = 'km';
            expected = 0.99420;
            assert.equal(convertHandler.convert(num, unit), expected);
            done();
        });

        test('Lbs to Kg', (done) => {
            num = 9;
            unit = 'lbs';
            expected = 4.08233;
            assert.equal(convertHandler.convert(num, unit), expected);
            done();
        });
        
        test('Kg to Lbs', (done) => {
            num = 7;
            unit = 'kg';
            expected = 15.43237;
            assert.equal(convertHandler.convert(num, unit), expected);
            done();
        });
    });
});