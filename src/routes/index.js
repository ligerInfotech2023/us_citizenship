const express = require('express');
const caseStatusRoute = require('./caseStatusRoute')
const readingRoute = require('./readingRoute')
const writingRoute = require('./writingRoute')
const questionV1Route = require('./questionV1Route')
const answerV1Route = require('./answerV1Route')
const readingVocabRoute = require('./readingVocabRoute')
const writingVocabRoute = require('./writingVocabRoute');
const commandRoutes = require('./commandRoute');
const smallTalkRoutes = require('./smallTalkRoute');
const n400VocabRoute = require('./n400VocabRoute');
const n400PracticeRoute = require('./n400PracticeRoute');

const routes = express.Router();


routes.use('/case-statuses',caseStatusRoute)
routes.use('/reading', readingRoute)
routes.use('/writing', writingRoute)
routes.use('/question-v1', questionV1Route)
routes.use('/answer-v1', answerV1Route)
routes.use('/vocabulary/reading', readingVocabRoute)
routes.use('/vocabulary/writing', writingVocabRoute)
routes.use('/command', commandRoutes);
routes.use('/small/talk', smallTalkRoutes);
routes.use('/n400/vocabulary', n400VocabRoute);
routes.use('/n400/practice', n400PracticeRoute)

module.exports = routes