/* eslint-disable no-console */
const dotenv = require('dotenv');
dotenv.config();

let devOptions = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    seederStorage: 'sequelize',
    charset: 'utf8mb4',
    omitNull: false,
    alter: true,
    define: {
        collate: 'utf8mb4_unicode_ci',
    }, pool: {
        max: 10,
        min: 0,
        idle: 500,
        acquire: 1000000,
        evict: 30000,
        handleDisconnects: true
    },
    dialectOptions: {
        bigNumberStrings: false,
        decimalNumbers: true,
        useUTC: true,
        timezone: 'Etc/GMT0',
    },
    timestamps: true,
    timezone: 'Etc/GMT0',
    logging: console.log
};
let stagingOptions = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    seederStorage: 'sequelize',
    charset: 'utf8mb4',
    omitNull: false,
    alter: true,
    define: {
        collate: 'utf8mb4_unicode_ci',
    }, pool: {
        max: 10,
        min: 0,
        idle: 500,
        acquire: 1000000,
        evict: 30000,
        handleDisconnects: true
    },
    dialectOptions: {
        bigNumberStrings: false,
        decimalNumbers: true,
        useUTC: true,
        timezone: 'Etc/GMT0',
    },
    timestamps: true,
    timezone: 'Etc/GMT0',
    logging: console.log
};
let productionOptions = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    seederStorage: 'sequelize',
    charset: 'utf8mb4',
    omitNull: false,
    alter: true,
    define: {
        collate: 'utf8mb4_unicode_ci',
    }, pool: {
        max: 50,
        min: 0,
        idle: 500,
        acquire: 1000000,
        evict: 30000,
        handleDisconnects: true
    },
    dialectOptions: {
        bigNumberStrings: false,
        decimalNumbers: true,
        useUTC: true,
        timezone: 'Etc/GMT0',
    },
    timestamps: true,
    timezone: 'Etc/GMT0',
    logging: console.log
};

module.exports = {
    production: productionOptions,
    staging: stagingOptions,
    development: devOptions
};