const model = require('../../database/models');
const Users = model.users;
const Roles = model.roles;
const UserRoles = model.user_roles;

/**
 * save new user to database
 * @param {*} userData - data for user 
 */
async function createUsers(userData) {
	return Users.create(userData);
}

/**
 * create user role
 * @param {*} userRoleData - data for user role
 */
async function createUserRoles(userRoleData) {
	return UserRoles.create(userRoleData);
}

/**
 * update user in database
 * @param {*} userData - new data for updated user
 * @param {*} whereConditions - where criteria
 */
async function updateUser(userData, whereCondition) {
	return Users.update(userData, { where: whereCondition });
}

/**
 * find user from database
 * @param {*} whereConditions - filter data from database
 */
async function findOneUser(whereCondition) {
	return Users.findOne({
		where: whereCondition,
		include: [{
			model: UserRoles,
			attributes: ['user_id', 'role_id'],
			as: 'user_roles',
			include: [{
				model: Roles,
				attributes: ['name']
			}]
		}]
	});
}

module.exports = {
	createUsers,
	createUserRoles,
	updateUser,
	findOneUser
};
