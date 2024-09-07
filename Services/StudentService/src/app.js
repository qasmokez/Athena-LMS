const express = require('express');
const cors = require('cors');
const yaml = require('js-yaml');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const OpenApiValidator = require('express-openapi-validator');

const auth = require('./auth');
const user = require('./user');
const student = require('./student');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const apiSpec = path.join(__dirname, '../api/openapi.yaml');
const apidoc = yaml.load(fs.readFileSync(apiSpec, 'utf8'));

app.use(
  '/v0/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(apidoc),
);

app.use(
  OpenApiValidator.middleware({
    apiSpec: apiSpec,
    validateRequests: true,
    validateResponses: true,
  }),
);

// Your routes go here
app.get('/v0/user/profile', auth.check, user.profile);
app.get('/v0/user/honors', auth.check, user.honors);
app.get('/v0/user/parents', auth.check, user.parents);
app.get('/v0/student/basicInfo', auth.check, student.getBasicStudentInfo);
app.get('/v0/student/expandInfo/:uuid', auth.check, student.getExpandStudentInfo);
app.post('/v0/student/basicInfo', auth.check, student.addBasicStudentInfo);


app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    message: err.message || 'An unexpected error occurred.',
    errors: err.errors || [],
    status: statusCode,
  });
});

module.exports = app;