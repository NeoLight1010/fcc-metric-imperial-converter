const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');
const ConvertHandler = require('../controllers/convertHandler');

const convertHandler = new ConvertHandler();

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test('Valid input', () => {
        chai.request(server)
            .get('/api/convert?input=10L')
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body, {
                    'initNum': 10,
                    'initUnit': 'L',
                    'returnNum': 2.264172,
                    'returnUnit': 'gal',
                    'string': '10 liters converts to 2.64172 gallons'
                });
            });
    });

    test('Invalid input', () => {
        chai.request(server)
            .get('/api/convert?input=32g')
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.text, convertHandler.invalid_unit);
            });
    });

    test('Invalid number', () => {
        chai.request(server)
            .get('/api/convert?input=3/7.2/4kg')
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.text, convertHandler.invalid_number);
            });
    });

    test('Invalid number and unit', () => {
        chai.request(server)
            .get('/api/convert?input=3/7.2/4kilomegagram')
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.text, convertHandler.invalid_number_and_unit);
            });
    });

    test('No number input', () => {
        chai.request(server)
            .get('/api/convert?input=kg')
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body, {
                    'initNum': 1,
                    'initUnit': 'kg',
                    'returnNum': 2.20462,
                    'returnUnit': 'lbs',
                    'string': '1 kilograms converts to 2.20462 pounds'
                });
            });
    });
});
