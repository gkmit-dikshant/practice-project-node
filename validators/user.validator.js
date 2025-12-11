const joi = require("joi");

const createUserVadiation = (req, res, next) => {
  const schema = joi
    .object({
      name: joi.string().max(50).min(3).required(),
      email: joi.string().email().max(254).required(),
      contact: joi
        .string()
        .length(10)
        .regex(/[1-9]\d{9}/),
    })
    .unknown(false);

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      ok: false,
      message: `Validation Failed: ${error.message}`,
    });
  }

  next();
};

const updateUserValidation = (req, res, next) => {
  const schema = joi
    .object({
      name: joi.string().max(50).min(3),
      contact: joi
        .string()
        .length(10)
        .regex(/[1-9]\d{9}/),
    })
    .unknown(false);

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      ok: false,
      message: `Validation Failed: ${error.message}`,
    });
  }

  next();
};

module.exports = {
  createUserVadiation,
  updateUserValidation,
};
