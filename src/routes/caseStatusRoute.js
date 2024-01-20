const express = require('express');
const { checkCaseStatus } = require('../controller/caseStatus');
const {rateLimit} = require('express-rate-limit')

const routes = express.Router();

const apiLimiter = rateLimit({
    windowMs:15 * 60 * 1000,
    limit: 100,
    standardHeaders:true,
    legacyHeaders:false,
    message: 'Rate limit exceeded. Please try again later.'
})

routes.get('/:receiptNumber', checkCaseStatus) 

module.exports = routes