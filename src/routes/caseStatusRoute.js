const express = require('express');
const { caseStatus, showToken } = require('../controller/caseStatus');
const {rateLimit} = require('express-rate-limit')

const routes = express.Router();

const apiLimiter = rateLimit({
    windowMs: 60 * 1000 , 
    limit: 50,
    standardHeaders:true,
    legacyHeaders:false
})

routes.get('/case-statuses/:receiptNumber',apiLimiter, caseStatus) 

module.exports = routes