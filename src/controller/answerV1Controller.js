const AnswerV1 = require("../models/answerV1");
const QuestionV1 = require("../models/questionV1");


const getAnswerV1List = async(req, res) => {
    try{
        const findAnswerV1 = await AnswerV1.findAll({attributes:{exclude:['createdAt', 'updatedAt']}})

        if(!findAnswerV1 || findAnswerV1.length === 0){
            return res.status(400).json({status:false, message:"No data to show"})
        }

        const answerList = findAnswerV1.map((data) => {
            const answerObject = {
                id: data.id,
                Text: data.Text,
                Lang: data.Lang,
                IsOk: data && data.IsOk ? 1 : 0,
                Active: data && data.Active ? 1 : 0,
                IsFake: data && data.IsFake ? 1 : 0,
                Question_id: data.Question_id,
                AOrder: data && data.AOrder ? 1 : 0,
                AudioOrder: data.AudioOrder,
            }
            return answerObject;
        })
        res.status(200).json({isChanged: 1, data:answerList})
    }catch(err){
        console.log('Internal server error while fetching answer v1 data: ',err);
        res.status(500).json({status:false, message:"Internal server error while fetching answer v1 data", error:err.message})
    }
}

module.exports = {
    getAnswerV1List
}