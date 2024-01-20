const express = require('express');
const { getN400PracticePartList, getN400PracticeQuestionList } = require('../controller/n400PracticeController');

const routes = express.Router();

//for get list of N400 practice part list
routes.get('/part/list', getN400PracticePartList);

//for get list of N400 practice question list
routes.get('/question/list', getN400PracticeQuestionList)

module.exports = routes;