const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API Social Media with Swagger',
    version: '1.0.0',
    description: 'CRUD API Social Media application documented with Swagger',
  },
  servers: [
    {
      url: 'http://localhost:8080',
      description: 'Development server',
    },
  ],
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: ['./routes/post/*.js','./routes/user/*.js', './routes/*.js']
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};