const express = require('express');
const app = express();
const apiRout = require('./router/rout');
require('./db/connection')
const port = 2000;

app.use(express.json());

app.use(apiRout);

app.listen(port, (req, res) => {
    console.log(`listening to the port ${port}`);
})