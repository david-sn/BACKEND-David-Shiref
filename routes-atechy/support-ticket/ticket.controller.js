const ticketSrvice = require('./ticket.service');
const HttpResponses = require('../../constants/http-responses.constants');
const formatResponse = require('../../helpers/response.helper').formatResponse;
const Op = require('sequelize').Op;

async function createSupportTicket(req, res, next) {
	try {
		let reqBody = req.body;
		let reqUser = req.user;

		let userTicketCreated = await ticketSrvice.createSupportTickets({
			user_id: reqUser.id, ...reqBody
		});

		return res.status(HttpResponses.OK.code).json(formatResponse(userTicketCreated));
	} catch (e) {
		return next(e);
	}
}

async function listSupportTickets(req, res, next) {
	try {
		let reqQuery = req.query;
		let queryFilter = {};
		let sortOrder = ['id', 'DESC'];
		const currentPage = parseInt(reqQuery.page) || 1;
		const pageLimit = parseInt(reqQuery.limit) || 50;

		if (reqQuery.sortBy && reqQuery.sortValue){
			sortOrder = [reqQuery.sortBy, reqQuery.sortValue];
		}
		if (reqQuery.userId) {
			queryFilter.user_id = reqQuery.userId;
		}
		if (reqQuery.status) {
			queryFilter.status = reqQuery.status;
		}
		if (reqQuery.priority) {
			queryFilter.priority = reqQuery.priority;
		}
		if (reqQuery.search) {
			queryFilter.message = { [Op.like]: `%${reqQuery.search}%` };
		}

		let supportTickets = await ticketSrvice.findSupportTickets(queryFilter, currentPage, pageLimit, sortOrder);
		supportTickets.current_page = currentPage;
		supportTickets.item_count = pageLimit;
		return res.status(HttpResponses.OK.code).json(formatResponse(supportTickets));
	} catch (e) {
		return next(e);
	}
}

module.exports = {
	createSupportTicket,
	listSupportTickets
};