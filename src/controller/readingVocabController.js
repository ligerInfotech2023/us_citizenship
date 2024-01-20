const ReadingVocab = require('../models/readingVocab')
const {Reading_Vocab} = require('../helper/enum')

const addReadingVocab = async(req, res) => {
    try{
        const body= req.body
        // const findData = await ReadingVocab.findOne({where:{text:body.text}})
        
        // if(findData){
        //     return res.status(400).send({status:false, message:`This text is already exists`})
        // }
        
        const readingVocabObj = {
            category: body.category,
            text: body.text
        }
        const addData = await ReadingVocab.create(readingVocabObj)
        return res.status(200).json({ status: true, message: 'New text added successfully', data: addData });
    }catch(err){
        console.log('Error while adding new reading vocabulary: ',err);
        res.status(500).json({status:false, message:"Internal server error while adding new reading vocabulary", error: err.message})
    }
}

const getReadingVocabList = async(req, res) => {
    try{
        const findData = await ReadingVocab.findAll({attributes:['category', 'text']});

        if(!findData || findData.length === 0){
            return res.status(404).json({status:false, message:"No data to show"})
        }

        // const responseData = {};
        // findData.forEach(item => {
        //     const {partTitle, option} = item.dataValues;
           
        //     responseData[category].push(text)
        // })
        
        // const findResponse = Object.keys(responseData).map(category => ({
        //     category: category,
        //     text: responseData[category]
        // }))


        res.status(200).json({data: findData})
    }catch(err){
        console.log('Error while getReadiVocabList: ',err);
        res.status(500).json({status:false, message:"Internal server error while get reading vocabulary list", error: err.message})
    }
}


module.exports = {
    addReadingVocab,
    getReadingVocabList
}