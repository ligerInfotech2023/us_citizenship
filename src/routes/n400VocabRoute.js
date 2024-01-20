const express = require('express');
const { addN400QuestionValidator } = require('../validator/n400Validator');
const {addN400Part, getN400PartList, addN400VocabQuestion, getN400VocabQuestionList } = require('../controller/n400VocabController');

const routes = express.Router()


//for add n400 vocabulary part
routes.post('/part/add', addN400Part);
routes.get('/part/list', getN400PartList)

//for add n400 vocabulary text/question
routes.post('/question/add', addN400VocabQuestion)
routes.get('/question/list', getN400VocabQuestionList)


module.exports = routes;