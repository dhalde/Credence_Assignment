const express = require('express');
const app = express();
const apiRout = require('./router/rout');
require('./db/connection');
const logger = require('./logger/index');

const port = process.env.PORT;


app.use(express.json());

app.use(apiRout);

app.listen(port, (req, res) => {

    logger.info(`running on the port:${port}`);
})