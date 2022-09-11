const request = require('supertest');
const sinon = require('sinon');

const requests = require('../../input/add-credit-card-input');
const responses = require('../../input/add-credit-card-response');
const { client } = require('../../../src/utils/redis-client');

var chai = require('chai');
const expect = require('chai').expect;

const headers = {
    Authorization: 'Api-Key x',
    correlationid: '123'
};

const headerInvalid = {
    Authorization: 'Api-key z',
};


module.exports = (app) => {
    describe('Add Credit Card Account Details Test Cases', () => {
        beforeEach( () => {
            sandBox = sinon.createSandbox();
        });
        
        afterEach(() => {
            sandBox.restore();
            sinon.restore();
        });

        it('Should return with 201 when posting credit card details', (done) => {
            sinon.stub(client, 'set').resolves(true);
            request(app)
                .post('/api/v1/payments')
                .send(requests.addCardInput)
                .set(headers)
                .expect(201, responses.successResponse, done);
        });

        it('Should return with 400 when there is an incomplete input json', (done) => {
            request(app)
                .post('/api/v1/payments')
                .send(requests.addCardInputIncomplete)
                .set(headers)
                .expect(400, responses.inputIncompleteResponse, done);
        });

        it('Should return with 400 when there is an empty value in input json', (done) => {
            request(app)
                .post('/api/v1/payments')
                .send(requests.addCardInputEmpty)
                .set(headers)
                .expect(400, responses.inputEmptyResponse, done);
        });

        it('Should return with 400 when there is an incorrect card number in input json', (done) => {
            request(app)
                .post('/api/v1/payments')
                .send(requests.addInvalidCardValue)
                .set(headers)
                .expect(400, responses.invalidCardResponse, done);
        });

        it('Should return with 400 when card number length is greater than 19 characters', (done) => {
            request(app)
                .post('/api/v1/payments')
                .send(requests.addIncorrectCardValue)
                .set(headers)
                .expect(400, responses.incorrectCardResponse, done);
        });

        it('Should return with 401 when API-Key is invalid', (done) => {
            request(app)
                .post('/api/v1/payments')
                .send(requests.addCardInput)
                .set(headerInvalid)
                .expect(401, responses.invalidAPIKeyResponse, done);
        });

        
        it('Should return with 503 when Redis DB is unavailable', (done) => {
            sinon.stub(client, 'set').rejects(false);
            request(app)
                .post('/api/v1/payments')
                .send(requests.addCardInput)
                .set(headers)
                .expect(503, responses.dbNotAvailableResponse, done);
        });

    });
}

