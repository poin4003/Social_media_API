// Import framework and library
require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

// Setup library
const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());

// Connect database setup
require('./dbs/mongo');

// Router setup
app.use(require('./routers'));

// Error handler function
app.use((err, res) => {
  const error = app.get('env') === 'development' ? err : {}
  const status = err.status || 500

  // Respone to Client
  return res.status(status).json({
    error: {
      code: status,
      message: error.message
    }
  })
})

module.exports = app;