const Command = require("../models/command");


const addNewCommand = async(req, res) => {
    try{
        const body = req.body;

        const findCommand = await Command.findOne({where:{command: body.command}});

        if(findCommand){
            return res.status(400).json({status:false, message: `This command "${body.command}" is alreadt exists`});
        }

        const newCommandObj = {
            command: body.command,
            command_description: body.command_description
        }
        const addCommand = await Command.create(newCommandObj)

        if(!addCommand){
            return res.status(400).json({status:false, message:"Failed! to add new command"})
        }
        res.status(200).json({status:true, message:"New command added successfully", command:addCommand})
    }catch(err){
        console.log("Internal server error while adding new command: ",err);
        res.status(500).json({status:false, message:"Internal server error while adding new command", error:err.message})
    }
}

const getCommandList = async(req, res) => {
    try{
        const findCommand = await Command.findAll({attributes:['command', 'command_description']})
        
        if(!findCommand || findCommand.length === 0 ){
            return res.status(404).json({status:false, message:"No data to show"})
        }
        res.status(200).json({data:findCommand})

    }catch(err){
        console.log("Internal server error while fetching command list: ",err);
        res.status(500).json({status:false, message:"Internal server error while fetching command list", error: err.list})
    }
}

module.exports = {
    addNewCommand,
    getCommandList
}