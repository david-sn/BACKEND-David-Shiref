const jwt = require('jsonwebtoken');
const GeneralException = require('../exceptions/general.exception');
const models = require('../database/models');
const Partners = models.partners;
const HeadersValidation = require('./request.helper');

function generatePushId () {
  // Modeled after base64 web-safe chars, but ordered by ASCII.
  let PUSH_CHARS = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';

  // Timestamp of last push, used to prevent local collisions if you push twice in one ms.
  let lastPushTime = 0;

  // We generate 72-bits of randomness which get turned into 12 characters and appended to the
  // timestamp to prevent collisions with other clients.  We store the last characters we
  // generated because in the event of a collision, we'll use those same characters except
  // "incremented" by one.
  let lastRandChars = [];
  let now = new Date().getTime();
  const duplicateTime = (now === lastPushTime);
  lastPushTime = now;

  const timeStampChars = new Array(8);
  for (let i = 7; i >= 0; i--) {
    timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
    // NOTE: Can't use << here because javascript will convert to int and lose the upper bits.
    now = Math.floor(now / 64);
  }
  if (now !== 0) throw new Error('We should have converted the entire timestamp.');

  let id = timeStampChars.join('');

  if (!duplicateTime) {
    for (let i = 0; i < 12; i++) {
      lastRandChars[i] = Math.floor(Math.random() * 64);
    }
  } else {
    let i;
    // If the timestamp hasn't changed since last push, use the same random number, except incremented by 1.
    for (i = 11; i >= 0 && lastRandChars[i] === 63; i--) {
      lastRandChars[i] = 0;
    }
    lastRandChars[i]++;
  }
  for (let i = 0; i < 12; i++) {
    id += PUSH_CHARS.charAt(lastRandChars[i]);
  }
  if (id.length !== 20) throw new Error('Length should be 20.');

  return id;
}

module.exports = {
  generatePushId,

  /**
     * Validate json web token for authentication and header
     * @author Noorul
     * @return json
     * @createdOn 01-june-2018
     * @purpose this function is usfull to verify token
     */

  userAuth: function (req, res, next) {
    // let msg = HeadersValidation.validateRequest(req.headers);
    // if (msg) {
    //   return next(GeneralException.ValidationError(msg));
    // }
    let token = req.headers.authorization;
    // check header or url parameters or post parameters for token
    if (!token) {
      // throw new Exception.validationError({en: 'Invalid Authentication Token'});
      return next();
    }
    token = token.substring(7);
    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
      if (err) {
        // throw new Exception.NotAuthenticated({en: err});
        return next(GeneralException.AuthenticationError('User authentication failure.'));
      }
      Partners.findOne({where: {
          id: user.uid
        },
        attributes: { exclude: ['created_at', 'updated_at', 'deleted_at', 'token'] }})
          .then(result => {
            if(!result) {
              return next(GeneralException.AuthenticationError('You are inactive right now.'));
            }
        let partner = result.get({ plain: true });
        req.user = partner;
        return next();
      })
        .catch(() => {
          return next(GeneralException.AuthenticationError('User authentication failure: '));
        });
    });
  }
};
