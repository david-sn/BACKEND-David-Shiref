const express = require('express');
const routes = express.Router();
const userController = require('./user.controller');
const passport = require('passport');

const validateJOI = require('../../middleware/joi-validation.middleware');
const validateRole = require('../../middleware/role-authorization-validate.middleware');

const { createUserSchema, updateUserSchema } = require('./user.validation');


routes.post('/v1/users', validateJOI(createUserSchema), userController.createUser);
routes.put('/v1/users/:id', passport.authenticate('jwt', { session: false }), validateRole(['USER']), validateJOI(updateUserSchema), userController.updateUser);


module.exports = routes;