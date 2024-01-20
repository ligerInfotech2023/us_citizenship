const {Model, DataTypes, ENUM} = require('sequelize');
const { Writing_Vocab } = require('../helper/enum');
const {sequelize} = require('../config/sequelizeInstance');

class WritingVocab extends Model {}

WritingVocab.init(
    {
        category:{
            type: DataTypes.ENUM,
            values: Object.values(Writing_Vocab)
        },
        text:{
            type: DataTypes.STRING
        }
    },
    {
        sequelize: sequelize,
        timestamps: true,
        tableName: "tbl_writing_vocab",
        modelName: "WritingVocab"
    }
);

module.exports = WritingVocab;