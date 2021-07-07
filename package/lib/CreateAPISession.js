const { KubeConfig } = require("kubernetes-client");
const Client = require("kubernetes-client").Client;
const Request = require("kubernetes-client/backends/request");

const CreateAPISession = (config) => {
    try {
        let base64kubeconfig = Buffer.from(config, "base64");
        let asciikubeconfig = base64kubeconfig.toString("ascii");

        const kubeconfig = new KubeConfig();
        kubeconfig.loadFromString(asciikubeconfig);
        const backend = new Request({ kubeconfig });
        const client = new Client({ backend, version: "1.13" });

        return client;
    } catch (error) {
        return false;
    }
};

module.exports = { CreateAPISession };
