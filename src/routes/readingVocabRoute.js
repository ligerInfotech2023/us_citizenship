const express = require('express');
const { addReadingVocab, getReadingVocabList } = require('../controller/readingVocabController');
const {readingVocabValidator} = require('../validator/readingVocabValidator');

const routes = express.Router()

routes.post('/add', addReadingVocab)
routes.get('/list', getReadingVocabList)

module.exports = routes;