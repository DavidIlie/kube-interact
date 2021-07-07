const router = require('express').Router();
const yaml = require("js-yaml");
const fs = require("fs");

const connect = require('../utils/middlewares/connect');

const createSchema = require('../utils/schema/create');
const deleteSchema = require('../utils/schema/delete');

const get = require('./get');
app.use('/get', get);

router.get('/', (req, res) => {
    res.json({
        message: "kube-interact"
    })
})

router.post('/nodes', connect, async (req, res, next) => {
    try {
        const nodes = await req.client.api.v1.nodes.get();
        res.json(nodes);
    } catch (error) {
        next(error)
    }
})

router.post('/namespaces', connect, async (req, res, next) => {
    try {
        const namespaces = await req.client.api.v1.namespaces.get();
        res.json(namespaces);
    } catch (error) {
        next(error);
    }
})

router.post('/create', connect, async (req, res, next) => {
    try {
        const body = await createSchema.validateAsync(req.body);
        try {
            const deployment = yaml.load(fs.readFileSync("./data/template-deployment.yaml", "utf8"));
    
            deployment.metadata.name = body.deployment.name;
            deployment.metadata.labels.app = body.deployment.name;
            deployment.spec.selector.matchLabels.app = body.deployment.name;
            deployment.spec.template.spec.containers[0].name = body.deployment.name;
            deployment.spec.template.metadata.labels.app = body.deployment.name;
            deployment.spec.replicas = body.deployment.pods;
            deployment.metadata.namespace = body.deployment.namespace;
            deployment.spec.template.spec.containers[0].image = body.deployment.docker_image;
            deployment.spec.template.spec.containers[0].ports[0].containerPort = body.deployment.port;
            deployment.spec.template.spec.containers[0].env = body.deployment.env;
    
            const created = await req.client.apis.apps.v1.ns(body.deployment.namespace).deploy.post({ body: deployment });
    
            res.json({
                message: created.body.status
            })
        } catch (error) {
            next(error);
        }
    } catch (error) {
        next(error);
    }
})

router.post('/delete', connect, async (req, res, next) => {
    try {
        const body = await deleteSchema.validateAsync(req.body);
        try {
            const deleted = await req.client.apis.apps.v1.ns(body.deployment.namespace).deployments(body.deployment.name).delete();
            res.json({
                message: deleted.body.status
            })
        } catch (error) {
            next(error);
        }
    } catch (error) {
        next(error)
    }
})

module.exports = router;