const Joi = require("@hapi/joi");

const authSchema = Joi.object({
  mobile: Joi.string().trim().lowercase().required(),
});

module.exports = { authSchema };
