require('./input/envLoader');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const passport = require('passport');
const routes = require('../src/routes/routes');
const { log: logger } = require('../src/lib/logger');
const cors = require('cors');
require("../src/authentication/authentication")
const app = express();

//Hetmet setup
app.use(helmet());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());
app.use(passport.initialize());

app.use(async (req, res, next) => {

  if (req.body && req.headers/correlationid) {
    req.headers['X-Request-Id'] = req.headers.correlationid;
    logger.info(req.headers);
  }
  next();
});

app.use(cors());
app.use('/', routes);


   /* eslint-disable-next-line */
app.listen(process.env.PORT, () => {
  logger.info(`Application is listening on port ${process.env.PORT}`);
});


process.on('unhandledRejection', (reason) => {
  logger.error(`Unhandled rejection ${reason}`);
});

process.on('unhandledException', (error) => {
  logger.error(`Unhandled exception ${error}`);
});

process.on('SIGINT', () => {
  logger.info('Shutdown Command Received');
  process.exit(0);
});

module.exports = app;