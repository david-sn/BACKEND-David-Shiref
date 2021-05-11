let models = require('../models');
const Op = require('sequelize').Op;

let users = [
	 
	 
			{
				"id" : 1,
				"user_id" : 2,
				"role_id" : 2,
			},
			{
				"id" : 2,
				"user_id" : 1,
				"role_id" : 1,	
			}
		 
		
];


module.exports = {
	up: () => {
		let promises = users.map(userRole => {
			return models.user_roles.findOrCreate({ where: { id: userRole.id }, defaults: userRole, paranoid: true });
		});
		return Promise.all(promises);
	},

	down: () => {
		let promises = user_roles.map(userRole => {
			return models.user_roles.destroy({ where: { id: userRole.id }, paranoid: false, truncate: true, cascade: false });
		});

		return Promise.all(promises);
	}
};
