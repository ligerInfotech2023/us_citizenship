const Reading = require("../models/reading")


const addNewQuestionForReading = async(req,res) => {
    try{
        const {question} = req.body
        const findData = await Reading.findOne({where:{question:question}})
        
        if(findData){
            return res.status(400).send({status:false, message:`This sentence/question '${question}' is already exists`})
        }
        
        const addData = await Reading.create({question:question})
        return res.status(200).json({ status: true, message: 'New sentence/question added successfully', data: addData });
    }catch(err){
        console.log('Error while adding new question: ',err);
        res.status(500).json({status:false, message:"Internal server error while adding new sentence/question", error: err.message})
    }
}

const getReadingQuestionList = async(req, res, next) => {
    try{
        const findData = await Reading.findAll({attributes:['id', 'question']})
        
        if(!findData || findData.length === 0){
            return res.status(404).json({status:false, message:"No data to show"})
        }
        res.status(200).json({isChanged:1,data: findData})
    }catch(err){
        console.log('Error while fetch reading question: ',err);
        res.status(500).json({status:false, message: "Internal server error while fetch reading question", error: err.message})
    }
}

module.exports = { addNewQuestionForReading, getReadingQuestionList }