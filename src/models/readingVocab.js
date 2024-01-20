const {Sequelize, Model, DataTypes} = require('sequelize')
const {Reading_Vocab} = require('../helper/enum')

const {sequelize} = require('../config/sequelizeInstance')

class ReadingVocab extends Model {}

ReadingVocab.init(
    {
        category:{
            type: DataTypes.ENUM,
            values: Object.values(Reading_Vocab)
        },
        text: {
            type: DataTypes.STRING,
        }

    },
    {
        sequelize: sequelize,
        timestamps: true,
        tableName: 'tbl_reading_vocab',
        modelName: 'ReadingVocab',
    }
)

module.exports = ReadingVocab