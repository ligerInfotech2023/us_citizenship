const N400PracticePart = require("../models/n400PracticePart");
const N400PracticeQuestion = require("../models/n400PracticeQuestion");


const getN400PracticePartList = async(req, res) => {
    try{
        const findData = await N400PracticePart.findAll({attributes:['id', 'Text']});

        if(!findData || findData.length === 0){
            return res.status(400).json({status:false, message:"No data to show"})
        }

        res.status(200).json({isChanged:1,data:findData})
    }catch(err){
        console.log("Internal server error while fetching n400 practice part list: ",err);
        res.status(500).json({status:false, message:"Internal server error while fetching N400 practice part list: ", error:err.message})
    }
}

const getN400PracticeQuestionList = async(req, res) => {
    try{
        const findN400Practice = await N400PracticeQuestion.findAll({attributes:{exclude:['createdAt', 'updatedAt']}})

        if(!findN400Practice || findN400Practice.length === 0){
            return res.status(400).json({status:false, message:"No data to show"})
        }
        const showResponse = findN400Practice.map(item => {
            const responseObject = {    
                id: item.id,
                LocalOrder: item.LocalOrder,
                Text: item.Text,
                Answer: item.Answer,
                Type: item.Type,
                ParentId: item.ParentId,
                ParentAnswer: item.ParentAnswer,
                Note: item.Note,
                TextRefId: item.TextRefId,
                Active: item && item.Active ? 1 : 0,
                OwnQuestion: item && item.OwnQuestion ? 1 : 0,
                PartId: item.PartId
            }
            
            return responseObject;
        })

        res.status(200).json({isChanged:2, data: showResponse})
    }catch(err){
        console.log('Internal server error while while fetching N400 practice question list: ',err);
        res.status(500).json({status:false, message:"Internal server error while while fetching N400 practice question list", error: err.message})
    }
}


module.exports = {
    getN400PracticePartList,
    getN400PracticeQuestionList
}