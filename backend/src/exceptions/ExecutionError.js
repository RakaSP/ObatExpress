const ClientError = require("./ClientError");

class ExecutionError extends ClientError {
  constructor(message) {
    super(message, 4001);
    this._name = "ExecutionError";
  }
}

module.exports = ExecutionError;
