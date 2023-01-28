const Joi = require("joi");

const createItemSchema = Joi.object({
    user_id: Joi.number().required(),
    name: Joi.string().required(),
    price: Joi.number().required(),
    stock: Joi.number().required()
}).required()

module.exports = createItemSchema