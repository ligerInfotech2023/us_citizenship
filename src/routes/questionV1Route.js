const express = require('express');
const { getQuestionV1List } = require('../controller/questionV1Controller');


const routes = express.Router();

routes.get('/list', getQuestionV1List);

module.exports = routes;