const GeneralException = require('../exceptions/general.exception');

function validateJOI(schema) {
  return (req, res, next) => {
    const { error, value } = schema.unknown().validate({...req.body, ...req.query}, { abortEarly: true, stripUnknown: true });
    req.query = { ...value };
    if (error)
      return next(GeneralException.BadRequest(error.details[0].message.replace(/"/g, '')));

    next();
  };
}

module.exports = validateJOI;
