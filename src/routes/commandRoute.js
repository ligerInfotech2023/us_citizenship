const express = require('express');
const { addNewCommand, getCommandList } = require('../controller/commandController');
const { addCommandValidator } = require('../validator/commandValidator');

const routes = express.Router();

routes.post('/add', addNewCommand);
routes.get('/list', getCommandList)

module.exports = routes;