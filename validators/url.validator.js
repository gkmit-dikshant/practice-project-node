const joi = require("joi");
const paginationValidation = (req, res, next) => {
  const schema = joi.object({
    page: joi.number().min(1),
    limit: joi.number().min(1),
    sort: joi.string(),
    order: joi.string().valid("-1", "1"),
  });

  const { error } = schema.validate(req.query);

  if (error) {
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }

  next();
};

module.exports = {
  paginationValidation,
};
