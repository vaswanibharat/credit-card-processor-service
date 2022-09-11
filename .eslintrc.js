const es6Config = require('@dwp/eslint-config-base');

es6Config.env.mocha = true;
es6Config.parserOptions.ecmaVersion = 2018;
es6Config.rules['linebreak-style'] = 0;

module.exports = es6Config;
