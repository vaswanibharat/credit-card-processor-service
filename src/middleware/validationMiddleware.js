const { log: logger } = require('../lib/logger');
const creditCardResponse = require('../common/credit-card-service-response');
const validCardNumber = require('./validCardNumber');

const validation = (schema) => async (req, res, next) => {
  const { correlationid } = req.headers;
  logger.info(`Request Received At Validation Middleware!! Correlation id is = ${correlationid}`);
  let validationError = '';
  let validCardFlag = '';
  let valid = '';
  let errorMessage = '';

  if (req.method === 'POST') {
    validationError = schema.validate({ headers: req.headers, inputBody: req.body });
    if (validationError.error == null) {
      if (req.body.requestDetails.cardNumber.length > 19) {
        logger.error(`Invalid Card length!! Correlation id is = ${correlationid}`);
        errorMessage = 'Invalid Card length';
        res.status(400).send(creditCardResponse(false, errorMessage));
      } else {
        validCardFlag = await validCardNumber(req);
        if (validCardFlag === false) {
          logger.error(`Invalid Card number!! Correlation id is = ${correlationid}`);
          errorMessage = 'Invalid Card number';
          res.status(400).send(creditCardResponse(false, errorMessage));
        }
      }
    }
  } else if (req.method === 'GET') {
    validationError = schema.validate({ headers: req.headers });
    valid = validationError.error == null;
  }

  const { error } = validationError;

  if (validCardFlag === true || valid) {
    next();
  } else if (error) {
    logger.error(`Credit Card Service Validation Error :: ${error} Correlation id is = ${correlationid}`);
    const errors = error.stack.split('"');
    errorMessage = errors[1] + errors[2];
    if (errors[3]) {
      errorMessage += errors[3];
    }
    if (errors[4]) {
      errorMessage += errors[4];
    }
    res.status(400).send(creditCardResponse(false, errorMessage));
  }
};
module.exports = validation;
