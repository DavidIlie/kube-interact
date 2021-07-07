const Joi = require('@hapi/joi');

module.exports = Joi.object({
    kubeconfig: Joi.string().base64().required(),
    deployment: Joi.object({
        name: Joi.string().trim().required(),
        namespace: Joi.string().trim().required(),
        port: Joi.number().required(),
        docker_image: Joi.string().trim().required(),
        pods: Joi.number().required(),
        env: Joi.array().items(Joi.object({
            name: Joi.string().trim().required(),
            value: Joi.string().trim().required(),
        })).required()
    }).required()
})