const Joi = require('@hapi/joi');

module.exports = Joi.object({
    kubeconfig: Joi.string().base64().required(),
}).unknown(true);