const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());

const middlewares = require('./utils/middlewares/middlewares');

const port = process.env.PORT | 7000
app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})

const api = require('./routes');
app.use('/api/kube-interact', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);