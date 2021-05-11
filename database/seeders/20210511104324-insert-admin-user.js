let models = require('../models');
const Op = require('sequelize').Op;

let users = [
	 
			{
				"id" : 1,
				"first_name" : "adminUSER",
				"last_name" : "adminUSER",
				"email" : "admin@admin.com",
				"password_salt" : "xgp5h427JqPRVcXUJ82wPw==",
				"password_hash" : "raOzib5AfkpagPGbgcx0sgHEKG1YlAD+Trj2ijhd28U=",
				"status" : "active",
			},
			{
				"id" : 2,
				"first_name" : "user1620728244709",
				"last_name" : "user1620728244709",
				"email" : "user@user.com",
				"password_salt" : "xgp5h427JqPRVcXUJ82wPw==",
				"password_hash" : "raOzib5AfkpagPGbgcx0sgHEKG1YlAD+Trj2ijhd28U=",
				"status" : "active",
			}
];


module.exports = {
	up: () => {
		let promises = users.map(user => {
			return models.users.findOrCreate({ where: { id: user.id }, defaults: user, paranoid: true });
		});
		return Promise.all(promises);
	},

	down: () => {
		let promises = users.map(user => {
			return models.users.destroy({ where: { id: user.id }, paranoid: false, truncate: true, cascade: false });
		});

		return Promise.all(promises);
	}
};
