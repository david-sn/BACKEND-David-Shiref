/* eslint-disable no-console */
const dotenv = require('dotenv');
dotenv.config();


const options = {
    secret: process.env.JWT_SECRET,
    algorithm: process.env.JWT_ALGORITHM,
    iss: process.env.JWT_ISS,
    sub: process.env.JWT_SUB,
    aud: process.env.JWT_AUD
};


module.exports = {
    production: options,
    staging: options,
    development: options
};
