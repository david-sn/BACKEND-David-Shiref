// const request = require('supertest');
const dotenv = require('dotenv');
dotenv.config();
// const appUrl = process.env.TESTING_URL;
const config = require('./../config/db.config.js')[process.env.APP_ENVIRONMENT];
const Sequelize = require('sequelize');
let sequelize = new Sequelize(config.database, config.username, config.password, config);

// eslint-disable-next-line no-undef
async function beforeAllTests() {
	try {
		await sequelize.query('select 2+5');
		console.log('------------Database connected successfully.-----------');
	} catch (e) {
		process.exit(1);
	}
}

module.exports = beforeAllTests;


