const { KubeConfig } = require("kubernetes-client");
const Client = require("kubernetes-client").Client;

const Request = require("kubernetes-client/backends/request");

const connectSchema = require('../schema/connect');

async function connect(req, res, next) {
    try {
        const body = await connectSchema.validateAsync(req.body);
        
        let base64kubeconfig = Buffer.from(body.kubeconfig, "base64");
        let asciikubeconfig = base64kubeconfig.toString('ascii');

        const kubeconfig = new KubeConfig();
        kubeconfig.loadFromString(asciikubeconfig);
        const backend = new Request({ kubeconfig });
        const client = new Client({ backend, version: "1.13" });

        req.client = client;

        next();
    } catch (error) {
        res.status(401).json({
            message: error.message
        });
    }
}

module.exports = connect;