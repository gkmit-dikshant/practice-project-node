module.exports = (req, res, next) => {
  res.success = (data, statusCode = 200, message = "success") => {
    return res.status(statusCode).json({
      success: true,
      message,
      ...data,
    });
  };
  res.error = (error) => {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "internal server error",
    });
  };

  next();
};
