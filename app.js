const dotenv = require('dotenv');
dotenv.config();
const env = process.env.NODE_ENV || 'development';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const dbConfig = require('./config/db.config.js')[env];
const cryptoConfig = require('./config/crypto.config.js')[env];
const jwtConfig = require('./config/jwt.config.js')[env];


const formatResponse = require('./helpers/response.helper').formatResponse;
const { InternalServerError, NotFound } = require('./constants/http-responses.constants');

const app = express();

app.disable('x-powered-by');

// CORS
app.use(cors());
app.disable('etag');


app.set('dbConfig', dbConfig);

global.__base = __dirname;
global.__dbConfig = dbConfig;
global.__jwtConfig = jwtConfig;
global.__cryptoConfig = cryptoConfig;


require('./database/models');
require('./passport/atechy.passport');
const atechyRoutes = require('./routes-atechy/atechy.routes');


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

atechyRoutes.setRoutes(app);


app.use(handleNotFound);
app.use(handleErrors);


module.exports = app;

function handleErrors (err, req, res, next) {
	let statusCode = err.status || InternalServerError.code;
	let statusMessage = err.statusCode || InternalServerError.name;

	if (err.transaction)
		err.transaction.rollback();

	res.status(statusCode).json(formatResponse(null, statusCode, statusMessage, err.message));
	next();
}

function handleNotFound (req, res, next) {
	let statusCode = NotFound.code;
	let statusMessage = NotFound.name;

	res.status(statusCode).json(formatResponse(null, statusCode, statusMessage, statusMessage));
	next();
}
