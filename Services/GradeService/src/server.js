/*
#######################################################################
#                   DO NOT MODIFY THIS FILE
#######################################################################
*/

require('dotenv').config();
// import dotenv from 'dotenv';

const app = require('./app.js');

app.listen(3012, () => {
  console.log(`grade-service server running on port 3012`);
  console.log('grade-service API Testing UI: http://localhost:3012/v0/api-docs/');
});