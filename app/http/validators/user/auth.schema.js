const Joi = require("@hapi/joi");

const authSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required(),
  password: Joi.string().trim().min(6).max(16).required(),
});

module.exports = { authSchema };
