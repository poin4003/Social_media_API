const cors = require('cors'); // Thêm dòng này để import cors

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

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
  apis: ['./src/routes/post/*.js', './src/routes/user/*.js', './src/routes/*.js'],
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  // Enable CORS for Swagger UI route
  app.use('/api-docs', cors({
    origin: '*',
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true
  }));
  
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
