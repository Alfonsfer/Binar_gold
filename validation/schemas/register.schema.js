const Joi = require('joi')

const registerSchema = Joi.object({
    email: Joi.string().email().required().min(6),
    password: Joi.string().min(8).required(),
    username: Joi.string().min(3).required(),
    address: Joi.string().required(),
    phone: Joi.string()
}).required()

module.exports = {registerSchema}