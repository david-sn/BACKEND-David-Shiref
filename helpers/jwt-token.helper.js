const jwt = require('jsonwebtoken');
const moment =  require('moment');
const dotenv = require('dotenv');
dotenv.config();

function createToken(userUid, roles) {
	const jwtPayload = {
		uid: userUid,
		alg: process.env.JWT_ALGORITHM,
		iss: process.env.JWT_ISS,
		sub: process.env.JWT_SUB,
		aud: process.env.JWT_AUD,
		iat: moment().unix(),
		exp: moment().add(1, 'years').unix(),
		roles: roles
	};
	return jwt.sign(jwtPayload, process.env.JWT_SECRET);
}

module.exports = {
	createToken
};
