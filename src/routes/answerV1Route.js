const express = require('express');
const { getAnswerV1List } = require('../controller/answerV1Controller');

const routes = express.Router()

routes.get('/list', getAnswerV1List)

module.exports = routes
