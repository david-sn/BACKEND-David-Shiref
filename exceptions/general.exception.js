const ErrorResponses = require('../constants/http-responses.constants');

function ValidationError(message, transaction) {
  return { status: ErrorResponses.BadRequest.code, statusCode: ErrorResponses.BadRequest.name, message: `${message}`, transaction: transaction };
}

function NotFoundError(message, transaction) {
  return { status: ErrorResponses.NotFound.code, statusCode: ErrorResponses.NotFound.name, message: message, transaction: transaction };
}

function AuthenticationError(message, transaction) {
  return { status: ErrorResponses.Unauthorized.code, statusCode: ErrorResponses.Unauthorized.name, message: message, transaction: transaction };
}

function BadRequest(message, transaction) {
  return {
    status: ErrorResponses.BadRequest.code, statusCode: ErrorResponses.BadRequest.name, message, transaction
  };
}



module.exports = {
  ValidationError,
  AuthenticationError,
  NotFoundError,
  BadRequest
};
