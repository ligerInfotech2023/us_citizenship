const express = require('express');
const { addSmallTalkQuestion, getSmallTalkList } = require('../controller/smallTalkController');
const { addSmallTalkValidator } = require('../validator/smallTalkValidator');

const routes = express.Router()

routes.post('/add', addSmallTalkQuestion);
routes.get('/list', getSmallTalkList);

module.exports = routes;