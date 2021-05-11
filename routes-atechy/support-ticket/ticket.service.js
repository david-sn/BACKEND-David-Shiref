'use strict';

const model = require('../../database/models');
const Users = model.users;
const SupportTicket = model.support_tickets;

/**
 * Save a new ticket created by admin user to database.
 * @param {*} userData - The poroperties of the assets,
 *  example ({
        message: string,
		status: ENUM('open', 'pending', 'resolved', 'closed')
		priority: ENUM('low', 'medium', 'high', 'urgent')
		user_id: number
	})
 */
async function createSupportTickets(userData) {
	return SupportTicket.create(userData);
}

/**
 * find ticket from database which created by admin
 * @param {*} whereConditions - filter data from database
 * @param {*} pageNo - page index
 * @param {*} limit - number of rows per page
 * @param {*} sortOrder - sorting data 
 */
async function findSupportTickets(whereConditions, pageNo, limit, sortOrder) {
	const offset = (pageNo - 1) * limit || 0;
	return SupportTicket.findAndCountAll({
		where: whereConditions,
		include: [{ 
			model: Users,
			attributes:['id','first_name','last_name','email']
		}],
		limit,
		offset,
		order: [sortOrder],
	});
}


module.exports = {
	createSupportTickets,
	findSupportTickets,
};
