const SmallTalk = require("../models/smallTalk");


const addSmallTalkQuestion = async(req, res) => {
    try{
        const body = req.body;

        const findSmallTalk = await SmallTalk.findOne({where:{question: body.question}})

        if(findSmallTalk){
            return res.status(400).json({status:false, message: `This question '${body.question}' is already exists`})
        }

        const smallTalkObj = {
            category: body.category,
            question: body.question,
            response: body.response
        }
        
        const addSmallTalk = await SmallTalk.create(smallTalkObj)
        if(!addSmallTalk){
            return res.status(400).json({status:false, message:"Failed! to add new small talk data"})
        }
        res.status(200).json({status:true, message: "SmallTalk added successfully", data: addSmallTalk})
    }catch(err){
        console.log('Internal server error while adding small talk question: ',err);
        res.status(500).json({status:false, message:"Internal server error while adding small talk question", error: err.message})
    }
}

const getSmallTalkList = async(req,res) => {
    try{
        const findSmallTalk = await SmallTalk.findAll({attributes:['category', 'question', 'response']})

        if(!findSmallTalk || findSmallTalk.length === 0){
            return res.status(404).json({status:false, message:"No data to show"})
        }

        //Different response
        // const responseData = [];
        // findSmallTalk.forEach(item => {
        //     const {category, question, response} = item.dataValues;
        //     const checkCategory = responseData.find(item => item.category === category);    

        //     if(checkCategory){
        //         checkCategory.data.push({question:question, response:response})
        //     }else{
        //         responseData.push({category:category, data:[{question:question, response:response}]})
        //     }
        // })
        
        
        res.status(200).json({data:findSmallTalk})
    }catch(err){
        console.log('Internal server error while fetching smallTalk data: ',err);
        res.status(500).json({status:false, message:"Internal server error while fetching smallTalk data", error:err.message})
    }
}

module.exports = {
    addSmallTalkQuestion,
    getSmallTalkList
}