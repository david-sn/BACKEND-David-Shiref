const GeneralException = require('../exceptions/general.exception');

function validateRole(functionRole) {
  return (req, res, next) => {
    let userRoles = req.user.user_roles;
    const result = userRoles.every(userRole => functionRole.includes(userRole));
    if (!result)
      return next(GeneralException.AuthenticationError('Invalid User Role Privliage...'));

    next();
  };
}

module.exports = validateRole;
