/*
#######################################################################
#                   DO NOT MODIFY THIS FILE
#######################################################################
*/

require('dotenv').config();
// import dotenv from 'dotenv';

const app = require('./app.js');

app.listen(3000, () => {
  console.log(`account-service server running on port 3000`);
  console.log('account-service API Testing UI: http://localhost:3000/v0/api-docs/');
});