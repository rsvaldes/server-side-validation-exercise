const joi = require('joi');

module.exports.post = {
  body: {
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    username: Joi.string().min(6).alphanum().required(),
    email: Joi.string(),
    password: Joi.string()
  }
};
