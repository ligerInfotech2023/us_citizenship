const {Sequelize, Model, DataTypes} = require('sequelize')

const {sequelize} = require('../config/sequelizeInstance')

class Writing extends Model {}

Writing.init(
    {
        question:{
            type: DataTypes.TEXT
        }
    },
    {
        sequelize: sequelize,
        timestamps: true,
        tableName: 'tbl_writing',
        modelName: 'Writing'
    }
)

module.exports = Writing