const passport = require('passport');
const passportJWT = require('passport-jwt');
const CryptoHelper = require('../helpers/crypto.helper');

const LocalStrategy = require('passport-local').Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

const models = require('../database/models');
const Users = models.users;
const Roles = models.roles;
const UserRoles = models.user_roles;

const Exception = require('../exceptions/general.exception');

const dotenv = require('dotenv');
dotenv.config();

passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password'
},
	function (email, password, next) {
		return Users.findOne({ where: { email: email } })
			.then(user => {
				if (!user) {
					return next(null, false, { message: 'Incorrect email or password.' });
				}

				let isValidPassword = CryptoHelper.verifyHash(password, user.password_hash, user.password_salt);
				if (!isValidPassword) {
					return next(null, false, { message: 'Incorrect email or password.' });
				}

				return next(null, user.get({ plain: true }), { message: 'Logged In Successfully' });
			})
			.catch(err => {
				return next(err);
			});
	}
));

passport.use(new JWTStrategy({
	jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET
}, async function (jwtPayload, next) {

	let user = await Users.findOne({
		where: { id: jwtPayload.uid, status: 'active' },
		attributes: { exclude: ['created_at', 'updated_at', 'deleted_at', 'password_salt', 'password_hash'] },
		include: [{
			model: UserRoles,
			attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] },
			include: [{
				model: Roles
			}]
		}],
	});
	if (!user)
		return next(Exception.AuthenticationError('You are not authorized to perform the selected action'));
	user.user_roles = user.user_roles.map(userRole => userRole.role.name);

	return next(null, user);
}
));

