const {Model, DataTypes} = require('sequelize');

const { sequelize } = require('../config/sequelizeInstance');

class Command extends Model {}

Command.init(
    {
        command:{
            type: DataTypes.TEXT
        },
        command_description:{
            type: DataTypes.TEXT
        }
    },
    {
        sequelize: sequelize,
        timestamps: true,
        tableName: "tbl_command",
        modelName: "Command"
    }

)

module.exports = Command;