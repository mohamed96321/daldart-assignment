class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.code = statusCode;
    this.status = `${statusCode}`.startsWith(4) ? "fail" : "error";
    this.isOperational = true;
  }
}

module.exports = ApiError;
