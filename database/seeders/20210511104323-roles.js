
let models = require('../models');

let roleArray = [
	{ id: 1, name: 'ADMIN' },
	{ id: 2, name: 'USER' }
];


module.exports = {
	up: () => {
		let promises = roleArray.map(role => {
			return models.roles.findOrCreate({
					where: { id: role.id },defaults: role, paranoid: true
				}).spread((result, created) => {
					if (!created)
						return result.update(role);
					return result;
				});
				
		});
		return Promise.all(promises);
	},

	down: () => {
		let promises = roleArray.map(role => {
			return models.roles_jlm
				.destroy({
					where: { id: role.id },
					paranoid: false,
					truncate: true,
					cascade: false
				});
		});

		return Promise.all(promises);
	}
};
