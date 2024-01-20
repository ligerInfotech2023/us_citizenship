const WritingVocab = require("../models/writingVocab");


const addWritingVocab = async(req, res) => {
    try{
        const body = req.body;

        // const findWritingVocab = await WritingVocab.findOne({where:{text:body.text}});

        // if(findWritingVocab){
        //     return res.status(400).json({status:false, message:`This text '${body.text}' is already exist`})
        // }

        const writingVocabObj = {
            category: body.category,
            text: body.text
        }

        const addWritingVocab = await WritingVocab.create(writingVocabObj);
        if(!addWritingVocab){
            return res.status(400).json({status:false, message:"Failed! to add new writing vocab"})
        }
        res.status(200).json({status:true, message:"New writing vocab added successfully", data: addWritingVocab})
    }catch(err){
        console.log('Error while adding new writing vocabulary: ',err);
        res.status(500).json({status:false, message:"Internal server errior while adding new writing vocabulary", error: err.message})
    }
}

const getWritingVocbList = async(req, res) => {
    try{
        const findWritingVocab = await WritingVocab.findAll({attributes:['category', 'text']});

        if(!findWritingVocab || findWritingVocab.length === 0){
            return res.status(404).json({status:false, message: "No data to show"})
        }
        
        //const responseData = {};

        // findWritingVocab.forEach(element => {
        //     const {category, text} = element.dataValues;

        //     if(!responseData[category]){
        //         responseData[category] = []
        //     }
        //     responseData[category].push(text)
        // });
        // const response = Object.keys(responseData).map(category => ({
        //     category:category,
        //     text: responseData[category]
        // }))

        res.status(200).json({data: findWritingVocab})
    }catch(err){
        console.log('Internal server error while fetching writing vocabulary list: ',err);
        res.status(500).json({status:false, message:"Internal server error while fetching writing vocabulary list", error:err.message});
    }
}

module.exports = {
    addWritingVocab,
    getWritingVocbList
}