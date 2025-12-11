const sendSuccessResponse = (res, statusCode, message, data) => {
  return res.status(statusCode).json({
    ok: true,
    message,
    data,
  });
};
const sendErrorResponse = (res, error) => {
  return res.status(error.statusCode || 500).json({
    ok: false,
    message: error.message || "internal server error",
    data: null,
  });
};

module.exports = {
  sendSuccessResponse,
  sendErrorResponse,
};
