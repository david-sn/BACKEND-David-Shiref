const express = require('express');
const routes = express.Router();
const ticketController = require('./ticket.controller');
const passport = require('passport');

const validateJOI = require('../../middleware/joi-validation.middleware');
const validateRole = require('../../middleware/role-authorization-validate.middleware');

const { createSupportTicketSchema, listSupportTicketSchema } = require('./ticket.validation');


routes.post('/v1/ticket-support', passport.authenticate('jwt', { session: false }), validateRole(['USER']), validateJOI(createSupportTicketSchema), ticketController.createSupportTicket);
routes.get('/v1/ticket-support', passport.authenticate('jwt', { session: false }), validateRole(['ADMIN']), validateJOI(listSupportTicketSchema), ticketController.listSupportTickets);

module.exports = routes;
