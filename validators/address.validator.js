const joi = require("joi");

const createAddressValidator = (req, res, next) => {
  const schema = joi
    .object({
      user_id: joi.number().required(),
      address_line: joi.string().min(7).required(),
      city: joi.string().min(3).max(20).required(),
      state: joi.string().min(3).max(20).required(),
      country: joi.string().min(3).max(20).required(),
      zip: joi
        .string()
        .length(6)
        .regex(/[1-6]\d{5}/)
        .required(),
    })
    .unknown(false);

  const { error } = schema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json({ ok: false, message: error.message, data: null });
  }

  next();
};
const updateAddressValidator = (req, res, next) => {
  const schema = joi
    .object({
      user_id: joi.number(),
      address_line: joi.string().min(7),
      city: joi.string().min(3).max(20),
      state: joi.string().min(3).max(20),
      country: joi.string().min(3).max(20),
      zip: joi
        .string()
        .length(6)
        .regex(/[1-6]\d{5}/),
    })
    .unknown(false);

  const { error } = schema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json({ ok: false, message: error.message, data: null });
  }

  next();
};

module.exports = {
  createAddressValidator,
  updateAddressValidator,
};
