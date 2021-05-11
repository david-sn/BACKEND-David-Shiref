const validation = require('./authentication.validate');
const GeneralException = require('../../exceptions/general.exception');
const HttpResponses = require('../../constants/http-responses.constants');
const formatResponse = require('../../helpers/response.helper').formatResponse;
const userService = require('../users/user.service');

const cryptoHelper = require('../../helpers/crypto.helper');
const JWTTokenHelper = require('../../helpers/jwt-token.helper');
const moment = require('moment');


async function loginUser(req, res, next) {
	try {
		let reqBody = req.body;

		let isUserFound = await userService.findOneUser({ email: reqBody.email });
		if (!isUserFound) {
			return next(GeneralException.ValidationError('User doesn\' exist.'));
		}
		const originalHash = isUserFound.password_hash;
		const salt = isUserFound.password_salt;
		let isValidPassword = cryptoHelper.verifyHash(req.body.password, originalHash, salt);
		if (!isValidPassword) {
			return next(GeneralException.ValidationError('Invalid Password'));
		}
		
		const token = JWTTokenHelper.createToken(
			isUserFound.id,
			isUserFound.user_roles.map(userRole => userRole.role.name)
		);
		const userResponseData = { ...isUserFound.get({plain: true}), token };
		delete userResponseData.password_hash; delete userResponseData.password_salt;

		await userService.updateUser({ last_login: moment() }, { id: isUserFound.id });
		return res.status(HttpResponses.OK.code).json(formatResponse(userResponseData));
	} catch (e) {
		return next(e);
	}
}


module.exports = {
	loginUser
};