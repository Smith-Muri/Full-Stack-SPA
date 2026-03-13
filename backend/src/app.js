const express = require('express');
const cors = require('cors');
const reportsRouter = require('./routes/reports');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/reports', reportsRouter);

app.use(errorHandler);

module.exports = app;
