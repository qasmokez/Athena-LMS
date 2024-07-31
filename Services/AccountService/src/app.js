const express = require('express');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const auth = require('./auth');
// const user = require('./user');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Swagger setup
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Account Service API',
      version: '0.0.1',
    },
  },
  apis: ['./routes/*.js'], // Path to the API docs
};

const specs = swaggerJsdoc(options);

app.use('/v0/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * /v0/login:
 *   post:
 *     summary: Logs in a user
 *     responses:
 *       200:
 *         description: Successful login
 */
app.post('/v0/login', auth.login);

app.use((err, req, res, next) => {
  res.status(err.status).json({
    message: err.message,
    errors: err.errors,
    status: err.status,
  });
});

module.exports = app;