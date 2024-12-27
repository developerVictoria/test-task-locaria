require('dotenv').config();
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const custormerRoute = require('./routes/customerRoutes');

const port = process.env.SERVER_PORT || 5000;


app.use(bodyParser.json());

app.use('/api/customers', custormerRoute);

app.listen(port, () => console.info(`Server is running in port ${port}`));