
const express = require('express');
const app = express();
const loadServer = require('./loaders');
/**
 * Passing express app to loader function.
 */
loadServer(app);
module.exports = app;