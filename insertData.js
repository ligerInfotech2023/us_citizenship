const QuestionV1 = require('./src/models/questionV1');
const AnswerV1 = require('./src/models/answerV1');
const N400PracticePart = require('./src/models/n400PracticePart');
const N400PracticeQuestion = require('./src/models/n400PracticeQuestion');


const insertData = (data) => {
    // Loop through the JSON data and create Sequelize instances
    data.forEach((record) => {

        // QuestionV1.findByPk(record.Question_id)
        // .then((question) => {
        //     if (!question) {
        //         console.error(`Error: Question with ID ${record.Question_id} does not exist.`);
        //         return;
        //     }

        //     // Create an AnswerV1 record with the correct QuestionId
        //     return AnswerV1.create({
        //         AOrder: record.AOrder,
        //         Active: record.Active,
        //         AudioOrder: record.AudioOrder,
        //         IsFake: record.IsFake,
        //         IsOk: record.IsOk,
        //         Lang: record.Lang,
        //         Text: record.Text,
        //         Question_id: record.Question_id, 
        //     });
        // })
        // .then(() => {
        //     console.log(`AnswerV1 record inserted for QuestionId ${record.Question_id}`);
        // })
        // .catch((err) => {
        //     console.error('Error inserting AnswerV1 record:', err);
        // });

        //=========for add question=============
        // QuestionV1.create(record)
        //     .then((result) => {
        //         console.log(`Record inserted with ID ${result.QuestionNro}`);
        //     })
        //     .catch((err) => {
        //         console.error('Error inserting record:', err);
        //     });

        //=========for add answer================
        // AnswerV1.create(record)
        // .then(result => {
        //     console.log(`Record inserted with ID ${result.Question_id}`);
        // })
        // .catch(err => {
        //     console.log(`Error while adding records: `,err);
        // })

        //for add n400_practice_part
        // N400PracticePart.create(record)
        // .then(result => {
        //     console.log(`Record inserted with Id ${result.id}`);
        // })
        // .catch(err => {
        //     console.log(`Error while adding records: `,err);
        // })


        //for add n400_practice_question
        
        // N400PracticeQuestion.create(record)
        // .then(result => {
        //     console.log(`Record inserted with Id ${result.id}`);
        // })
        // .catch(err => {
        //     console.log(`Error while adding records: `,err);
        // })
    });
}

module.exports = {insertData}