/* eslint-disable global-require */
require('./input/envLoader');
/* eslint-disable import/no-unresolved */
const app = require('./server');

describe('Await Server Start', () => {
    it('Wrapper', (done) => {
        require('./unit/controllers/add-credit-card-details.test')(app);
        done();
    });
});