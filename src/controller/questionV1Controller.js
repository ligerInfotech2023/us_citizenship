const QuestionV1 = require("../models/questionV1");



const getQuestionV1List = async(req,res) => {
    try{
        const findData = await QuestionV1.findAll({attributes:{exclude:['createdAt', 'updatedAt']}});
        if(!findData || findData.length === 0){
            return res.status(404).json({status:false, message: "No data to show"})
        }
        res.status(200).json({isChanged:1,data:findData})
    }catch(err){
        console.log('Internal sever error while getQuestionList: ',err);
        res.status(500).json({status:false, message:"Internal server error while get questionv1 list", error:err.message})
    }
}


module.exports = { getQuestionV1List }