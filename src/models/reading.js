const {Sequelize, Model, DataTypes} = require('sequelize')

const {sequelize} = require('../config/sequelizeInstance')


class Reading extends Model {}

Reading.init(
    {
        question:{
            type: DataTypes.TEXT
        }
    },
    {
        sequelize: sequelize,
        timestamps: true,
        tableName: 'tbl_reading',
        modelName: 'Reading'
    }
)

module.exports = Reading