const Joi = require('@hapi/joi');

module.exports = Joi.object({
    kubeconfig: Joi.string().base64().required(),
    deployment: Joi.object({
        name: Joi.string().trim().required(),
        namespace: Joi.string().trim().required(),
    })
})