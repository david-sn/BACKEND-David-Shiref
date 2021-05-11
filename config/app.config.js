/* eslint-disable no-console */
const dotenv = require('dotenv');
dotenv.config();

const options = {
    port: process.env.APP_PORT,
    environment: process.env.APP_ENVIRONMENT
};

module.exports = {
    production: options,
    staging: options,
    development: options
};
