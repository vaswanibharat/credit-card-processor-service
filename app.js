/* eslint-disable import/order */
require('dotenv').config();
require('./src/lib/load-props');
require('./src/authentication/authentication');
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');
const helmet = require('helmet');
const passport = require('passport');
const constants = require('constants');
const routes = require('./src/routes/routes');
const { log: logger } = require('./src/lib/logger');
const cors = require('cors');

const app = express();

// Hetmet setup
app.use(helmet());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());
app.use(passport.initialize());

app.use(async (req, res, next) => {
  if (!req.url.includes('health')) {
    logger.info('Request Received At Credit Card Api');
  }
  if (req.body && req.headers.correlationid) {
    req.headers['X-Request-Id'] = req.headers.correlationid;
    logger.info(req.headers);
  }
  next();
});

app.use(cors());
app.use('/', routes);

let server;
// Server Startup
if (process.env.HTTPS_SERVER === 'true') {
  const httpsKeys = {
    /* eslint-disable-next-line */
    key: fs.readFileSync(`${process.env.CERT_LOCATION}${process.env.HTTPS_KEY}`, 'utf-8'),
    cert: fs.readFileSync(`${process.env.CERT_LOCATION}${process.env.HTTPS_CERT}`, 'utf-8'),
    /* eslint-disable-next-line */
    secureOptions: constants.SSL_OP_NO_TLSv1 | constants.SSL_OP_NO_TLSv1_1,
  };
  server = https.createServer(httpsKeys, app).listen(process.env.PORT, () => {
    logger.info(`Application is listening on secure port ${process.env.PORT}`);
  });
} else {
  /* eslint-disable-next-line */
   server = app.listen(process.env.PORT, () => {
    logger.info(`Application is listening on port ${process.env.PORT}`);
  });
}

process.on('unhandledRejection', (reason) => {
  logger.error(`Unhandled rejection ${reason}`);
});

process.on('unhandledException', (error) => {
  logger.error(`Unhandled exception ${error}`);
});

process.on('SIGINT', () => {
  logger.info('Shutdown Command Received');
  server.close();
  process.exit(0);
});
