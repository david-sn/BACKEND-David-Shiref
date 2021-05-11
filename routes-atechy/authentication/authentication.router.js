const express = require('express');
const router = express.Router();
const controller = require ('./authentication.controller');

const validateJOI = require('../../middleware/joi-validation.middleware');
 
const { loginSchema} = require('./authentication.validate');


router.post('/v1/authentication/login', validateJOI(loginSchema), controller.loginUser);

module.exports = router;