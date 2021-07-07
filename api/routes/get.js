const router = require('express').Router();

const connect = require('../utils/middlewares/connect');

router.get('/', (req, res) => {
    res.json({
        message: "Available subroutes",
        routes: [
            {
                name: "nodes",
                description: "Get all nodes"
            }
        ]
    })
})