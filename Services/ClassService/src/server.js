/*
#######################################################################
#                   DO NOT MODIFY THIS FILE
#######################################################################
*/

require('dotenv').config();
// import dotenv from 'dotenv';

const app = require('./app.js');

app.listen(3013, () => {
  console.log(`class-service server running on port 3013`);
  console.log('class-service API Testing UI: http://localhost:3013/v0/api-docs/');
});