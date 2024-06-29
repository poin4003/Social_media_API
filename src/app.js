// Import framework and library
require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const swagger = require('../swagger');

// Setup library
const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());

// Connect database setup
require('./dbs/mongo');

// Swagger setup
swagger(app);

// Router setup
app.use(require('./routers'));

// Error handler function
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({
    error: {
      code: status,
      message: message
    }
  });
});


module.exports = app;