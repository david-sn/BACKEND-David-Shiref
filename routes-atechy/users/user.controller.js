const userSrvice = require('./user.service');
const GeneralException = require('../../exceptions/general.exception');
const HttpResponses = require('../../constants/http-responses.constants');
const formatResponse = require('../../helpers/response.helper').formatResponse;
const CryptoHelper = require('../../helpers/crypto.helper');

async function createUser(req, res, next) {
	try {
		let reqBody = req.body;
		let isUserFound = await userSrvice.findOneUser({ email: reqBody.email });
		if (isUserFound) {
			return next(GeneralException.BadRequest('Email Already Exists...'));
		}

		const {salt, hash} = CryptoHelper.hashPassword(reqBody.password);
		let userObj = {
			...reqBody, password_hash: hash, password_salt: salt
		};
		let userCreated = await userSrvice.createUsers(userObj);
		await userSrvice.createUserRoles({
			user_id: userCreated.id, role_id: reqBody.is_admin === 'ADMIN' ? 1 : 2
		});

		delete userCreated.password_hash; 
		delete userCreated.password_salt;
		return res.status(HttpResponses.OK.code).json(formatResponse(userCreated));
	} catch (e) {
		return next(e);
	}
}

async function updateUser(req, res, next) {
	try {
		let reqBody = req.body;
		let reqUser = req.user;
		let isUserFound = await userSrvice.findOneUser({ id: reqUser.id });
		if (!isUserFound) {
			return res.status(HttpResponses.NotFound.code).json(formatResponse(reqBody));
		}
		let userCreated = await userSrvice.updateUser(reqBody, { id: reqUser.id });
		return res.status(HttpResponses.OK.code).json(formatResponse(userCreated));
	} catch (e) {
		return next(e);
	}
}

module.exports = {
	createUser,
	updateUser
};