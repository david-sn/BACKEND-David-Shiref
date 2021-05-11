const Joi = require('@hapi/joi');


const createUserSchema = Joi.object().keys({
	password: Joi.string().required(),
	email: Joi.string().required().email({ tlds: { allow: false } }),
	first_name: Joi.string().required(),
	last_name: Joi.string().required(),
	role: Joi.string().valid('USER', 'ADMIN').required(),
});

const updateUserSchema = Joi.object().keys({
	first_name: Joi.string().required(),
	last_name: Joi.string().required(),
});
module.exports = {
	createUserSchema,
	updateUserSchema
};
