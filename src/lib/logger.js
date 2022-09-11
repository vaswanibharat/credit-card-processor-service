const bunyan = require('bunyan');

const log = bunyan.createLogger({
  name: 'credit-card-processor-service',
  stream: process.stdout,
  level: 'info',
});

module.exports.logError = (error) => this.log.error({ err: error });
module.exports.log = log;
