const awsParamStore = require('aws-param-store');
const dotEnv = require('dotenv');
const dotEnvSafe = require('dotenv-safe');

module.exports = (() => {
  dotEnv.config();
  const serviceName = process.env.SERVICE_NAME;
  const targetEnv = process.env.TARGET_ENV;

  /* eslint-disable */
  process.env.API_KEY = process.env.NODE_ENV === 'production'
    ? awsParamStore.getParameterSync([`/${targetEnv}/${serviceName}/API_KEY`], {
      region: 'eu-west-2',
    }).Parameters[0].value
    : process.env.API_KEY;
    dotEnvSafe.config({
    example: './.env.required',
    });
})();