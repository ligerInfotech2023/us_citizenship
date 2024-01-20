const express = require('express')
const { addWritingQuesOrSentValidator } = require('../validator/writingValidator')
const { addNewQuestionForWriting, getWritingQuestionList } = require('../controller/writingController')

const routes = express.Router()

routes.post('/add/question', addNewQuestionForWriting)
routes.get('/list', getWritingQuestionList)

module.exports = routes;