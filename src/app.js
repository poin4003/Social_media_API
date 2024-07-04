// Import framework and library
require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const swagger = require('./swagger');

// Setup library
const app = express();

// Setup Middleware
app.use(logger('dev'));
app.use(bodyParser.json());

var corsOptionsDelegate = function (req, callback) {
  var corsOptions = { origin: true };
  callback(null, corsOptions);
};

app.use(cors(corsOptionsDelegate));

// Swagger setup
swagger(app);

// Router setup
app.use(require('./routes'));

// Connect database setup
require('./dbs/mongo');

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
