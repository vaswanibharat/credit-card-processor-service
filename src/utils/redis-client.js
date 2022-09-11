require('dotenv').config();
const Redis = require('ioredis');
const { log: logger } = require('../lib/logger');

let client;

try {
  client = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    tls: process.env.NODE_ENV === 'production' ? {
      checkServerIdentity: () => undefined,
    } : undefined,
    reconnectOnError: (err) => {
      /* eslint-disable-next-line */
      logger.error(`Error connecting Redis, reconnecting: ${JSON.stringify(err)}`);
      return false;
    },
  });
} catch (err) {
  /* eslint-disable-next-line */
    logger.error('IORedis Instantiate Error:', err);
  throw err;
}

let isCacheConnected = false;

client.on('ready', (err) => {
  if (err) {
    logger.error(`Redis connection error: ${err}`);
    isCacheConnected = false;
  } else {
    isCacheConnected = true;
  }
});

client.on('error', (err) => {
  isCacheConnected = false;
  logger.error(`Redis connection error: ${err}`);
});

client.on('reconnecting', (err) => {
  isCacheConnected = false;
  logger.error(`Redis connecting: ${err}`);
});

client.on('end', (err) => {
  isCacheConnected = false;
  if (err) {
    logger.error(`Redis connection ended: ${err}`);
  }
});

client.on('close', (err) => {
  isCacheConnected = false;
  if (err) {
    logger.error(`Redis connection closed: ${err}`);
  }
});

client.on('connect', (err) => {
  if (!err) {
    isCacheConnected = true;
    logger.info('Redis Connected');
    logger.debug(client);
  } else {
    logger.error(`Redis connection error: ${err}`);
  }
});

function getCacheFlag() {
  return isCacheConnected;
}

module.exports = {
  client,
  getCacheFlag,
};
