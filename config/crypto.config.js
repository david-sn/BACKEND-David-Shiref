/* eslint-disable no-console */
const dotenv = require('dotenv');
dotenv.config();

const options = {
    cypherKey: process.env.CRYPTO_KEY,
    cypherAlgorithm: process.env.CRYPTO_ALGORITHM
};

module.exports = {
    production: options,
    staging: options,
    development: options
};
