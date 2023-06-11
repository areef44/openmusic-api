//module client error
const ClientError = require('./ClientError');
 
//class contructor invariants error
class InvariantError extends ClientError {
  constructor(message) {
    super(message);
    this.name = 'InvariantError';
  }
}

//exports module invariant error
module.exports = InvariantError;