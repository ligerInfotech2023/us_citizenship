const {Model, DataTypes} = require('sequelize');

const {sequelize} = require('../config/sequelizeInstance');
const N400Part = require('./n400Part');


class N400VocabQuestion extends Model {}

N400VocabQuestion.init(
    {
        text:{
            type: DataTypes.TEXT
        },
        answer:{
            type: DataTypes.TEXT
        }

    },
    {
        sequelize: sequelize,
        timestamps: true,
        tableName: "tbl_n400_vocabquestion",
        modelName: "N400VocabQuestion"
    }
)


N400VocabQuestion.belongsTo(N400Part, {foreignKey: "part_id"})

module.exports = N400VocabQuestion