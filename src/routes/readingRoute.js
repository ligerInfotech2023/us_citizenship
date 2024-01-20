const express = require('express');
const { addNewQuestionForReading, getReadingQuestionList } = require('../controller/readingController');
const { addReadingQuesOrSentValidator } = require('../validator/readingValidator');

const routes = express.Router()

routes.post('/add/question', addNewQuestionForReading)
routes.get('/list', getReadingQuestionList)

module.exports = routes;