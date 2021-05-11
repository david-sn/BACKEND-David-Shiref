const Joi = require('@hapi/joi');


const loginSchema = Joi.object().keys({
    email: Joi.string().required().email({ tlds: { allow: false } }),
    password: Joi.string().required(),
});


module.exports = {
	loginSchema
};