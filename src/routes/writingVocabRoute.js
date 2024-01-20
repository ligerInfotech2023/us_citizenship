const express = require('express');
const { addWritingVocab, getWritingVocbList } = require('../controller/writingVocabController');
const {writingVocabValidator} = require('../validator/writingVocabValidator');

const routes = express.Router();

routes.post('/add', addWritingVocab);
routes.get('/list', getWritingVocbList);

module.exports = routes;