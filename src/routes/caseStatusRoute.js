const express = require('express');
const { caseStatus } = require('../controller/caseStatus');

const routes = express.Router();

routes.get('/case-statuses/:receiptNumber', caseStatus) 

module.exports = routes