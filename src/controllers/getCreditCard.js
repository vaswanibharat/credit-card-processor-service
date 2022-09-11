const { client } = require('../utils/redis-client');
const creditCardResponse = require('../common/credit-card-service-response');
const { log: logger } = require('../lib/logger');

const getCreditCard = () => async (req, res) => {
  const { correlationid } = req.headers;
  const response = [];

  await client.keys('*').then(async (keys) => {
    for (let i = 0, len = keys.length; i < len; i++) {
      /* eslint-disable-next-line */
      await client.get(keys[i]).then((result) => {
        response.push(JSON.parse(result));
      });
    }
    res.status(200).send(response);
    logger.info(`Card details are fetch sucessfully!! Correlation id is = ${correlationid}`);
  }).catch((error) => {
    logger.error(`${error}. Correlation id is = ${correlationid}`);
    res.status(503).send(creditCardResponse(false, 'Database Unavailable'));
  });
};

module.exports = getCreditCard;
