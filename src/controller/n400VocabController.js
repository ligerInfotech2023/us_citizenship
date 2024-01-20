const N400part = require("../models/n400Part");
const N400VocabQuestion = require("../models/n400VocabQuestion");



const addN400Part = async(req, res) => {
    try{
        const body = req.body;
        const findN400Part = await N400part.findOne({where:{partTitle:body.partTitle}})
        if(findN400Part){
            return res.status(400).json({status:false, message: `This part '${body.partTitle}' is already exists`})
        }

        const n400OPartbject = {
            partTitle: body.partTitle,
            option: body.option
        }

        const addData = await N400part.create(n400OPartbject)
        
        res.status(200).json({status:true, message:"Successfully added N400 part", data: addData})
    }catch(err){
        console.log('Internal server error while adding n400 vocabulary: ',err);
        res.status(500).json({status:false, message:"Internal server error while adding n400 vocanulary", error:err.message})
    }
}


const addN400VocabQuestion = async(req, res) => {
    try{
        const body = req.body;
        
        const findVocab = await N400VocabQuestion.findOne({where:{text:body.text}})

        if(findVocab){
            return res.status(400).json({status:false, message: `This text "${body.text}"  is already exists`})
        }

        const findN400Part = await N400part.findOne({where:{partTitle:body.part}})

        if(!findN400Part){
            return res.status(404).json({status:false, message: `This N400 part "${body.part}" is not found`})
        }

        const createVocabObject = {
            text: body.text,
            answer: body.answer,
            part_id: findN400Part.id
        }

        const createVocab = await N400VocabQuestion.create(createVocabObject)

        res.status(200).json({status:true, message: 'New N400 vocabulary text added successfully',data:createVocab })
    }catch(err){
        console.log('Internal server error while adding new text for n400 vocabulary: ',err);
        res.status(500).json({status:false, message:"Internal server error while adding new n400 vocabulary text", error:err.message})
    }
}

const getN400PartList = async(req, res) => {
    try{
        const findN400Part = await N400part.findAll({attributes:['id', 'partTitle', 'option']})

        if(!findN400Part || findN400Part.length === 0){
            return res.status(400).json({status:false, message:"No data to show"})
        }

        const formatResponse = findN400Part.map(item => ({
            id: item.id,
            partTitle: item.partTitle,
            // option: JSON.parse(item.option)
        }))
  
        res.status(200).json({data:formatResponse})

    }catch(err){
        console.log('Internal server error while get n400 vocabulary list: ',err);
        res.status(500).json({status:false, message:"Internal server error while get n400 vocabulary list", error:err.message})
    }
}

const getN400VocabQuestionList = async(req, res) => {
    try{
        const findN400Vocab = await N400VocabQuestion.findAll({include:[{model:N400part, attributes:['partTitle','option']}]})

        if(!findN400Vocab || findN400Vocab.length === 0){
            return res.status(400).json({status:false, message:"No data to show"})
        }
        
        const formatResponse = findN400Vocab.map(item => {
    
            const responseobject = {
                id: item.id,
                text: item.text,
                answer: item.answer,
                partTitle: item && item.N400Part.partTitle ? item.N400Part.partTitle : "",
                part_id: item.part_id,
                option: item && item.N400Part.option ? JSON.parse(item.N400Part.option) : ""
            }
            return responseobject;
        })

       

        res.status(200).json({data:formatResponse})
    }catch(err){
        console.log("Internal server error while fetching n400 vocabualary question list: ",err);
        res.status(500).json({status:false, message:"Internal server error while fetching n400 vocab question list", error: err.message})
    }
}

module.exports = {
    addN400Part,
    getN400PartList,
    addN400VocabQuestion,
    getN400VocabQuestionList
}