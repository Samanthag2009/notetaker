const express = require("express");
const app = express();
const noteRoute = require('./notes');

app.use('/notes', noteRoute);

module.exports = app;