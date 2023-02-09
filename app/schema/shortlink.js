const Joi = require("joi");

module.exports = Joi.object({
  target: Joi.string()
    .uri({
      scheme: ["http", "https"],
    })
    .required(),
  password: Joi.string().min(8).required(),
});
