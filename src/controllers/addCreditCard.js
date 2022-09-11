const { client } = require('../utils/redis-client');
const creditCardResponse = require('../common/credit-card-service-response');
const { log: logger } = require('../lib/logger');

const addCreditCard = () => async (req, res) => {
  const { correlationid } = req.headers;
  const redisInputBody = {
    name: req.body.requestDetails.name ? req.body.requestDetails.name : undefined,
    cardNumber: req.body.requestDetails.cardNumber ? req.body.requestDetails.cardNumber : undefined,
    balance: 0,
    limit: req.body.requestDetails.limit ? req.body.requestDetails.limit : undefined,

  };

  await client.set(req.body.requestDetails.cardNumber, JSON.stringify(redisInputBody)).then(() => {
    logger.info(`Card details added successfully!! Correlation id is = ${correlationid}`);
    res.status(201).send(creditCardResponse(true, 'Card details added successfully'));
  }).catch((error) => {
    logger.error(`${error}. Correlation id is = ${correlationid}`);
    res.status(503).send(creditCardResponse(false, 'Database Unavailable'));
  });
};

module.exports = addCreditCard;
