const { CreateAPISession } = require("./lib/CreateAPISession");
const { getNodes } = require("./functions/get/getNodes");
const { getNamespaces } = require("./functions/get/getNamespaces");

module.exports = { CreateAPISession, getNodes, getNamespaces };
