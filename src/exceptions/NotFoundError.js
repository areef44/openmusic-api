//module client error
const ClientError = require('./ClientError');
 
//class contructor clients error
class NotFoundError extends ClientError {
  constructor(message) {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}
 
//exports module not found error
module.exports = NotFoundError;