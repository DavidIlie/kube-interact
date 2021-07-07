//OLD ROUTES WHICH WILL BE CONVERTED INTO FUNCTIONS

module.exports = Joi.object({
    kubeconfig: Joi.string().base64().required(),
    deployment: Joi.object({
        name: Joi.string().trim().required(),
        namespace: Joi.string().trim().required(),
        port: Joi.number().required(),
        docker_image: Joi.string().trim().required(),
        pods: Joi.number().required(),
        env: Joi.array()
            .items(
                Joi.object({
                    name: Joi.string().trim().required(),
                    value: Joi.string().trim().required(),
                })
            )
            .required(),
    }).required(),
});

router.post("/create", connect, async (req, res, next) => {
    try {
        const body = await createSchema.validateAsync(req.body);
        try {
            const deployment = yaml.load(
                fs.readFileSync("./data/template-deployment.yaml", "utf8")
            );

            deployment.metadata.name = body.deployment.name;
            deployment.metadata.labels.app = body.deployment.name;
            deployment.spec.selector.matchLabels.app = body.deployment.name;
            deployment.spec.template.spec.containers[0].name =
                body.deployment.name;
            deployment.spec.template.metadata.labels.app = body.deployment.name;
            deployment.spec.replicas = body.deployment.pods;
            deployment.metadata.namespace = body.deployment.namespace;
            deployment.spec.template.spec.containers[0].image =
                body.deployment.docker_image;
            deployment.spec.template.spec.containers[0].ports[0].containerPort =
                body.deployment.port;
            deployment.spec.template.spec.containers[0].env =
                body.deployment.env;

            const created = await req.client.apis.apps.v1
                .ns(body.deployment.namespace)
                .deploy.post({ body: deployment });

            res.json({
                message: created.body.status,
            });
        } catch (error) {
            next(error);
        }
    } catch (error) {
        next(error);
    }
});

module.exports = Joi.object({
    kubeconfig: Joi.string().base64().required(),
    deployment: Joi.object({
        name: Joi.string().trim().required(),
        namespace: Joi.string().trim().required(),
    }),
});

router.post("/delete", connect, async (req, res, next) => {
    try {
        const body = await deleteSchema.validateAsync(req.body);
        try {
            const deleted = await req.client.apis.apps.v1
                .ns(body.deployment.namespace)
                .deployments(body.deployment.name)
                .delete();
            res.json({
                message: deleted.body.status,
            });
        } catch (error) {
            next(error);
        }
    } catch (error) {
        next(error);
    }
});
