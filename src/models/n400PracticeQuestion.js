const {Model, DataTypes} = require('sequelize');

const {sequelize} = require('../config/sequelizeInstance');
const N400PracticePart = require('./n400PracticePart');

class N400PracticeQuestion extends Model {}

N400PracticeQuestion.init(
    {
        LocalOrder:{
            type: DataTypes.INTEGER
        },
        Text:{
            type: DataTypes.TEXT
        },
        Answer:{
            type: DataTypes.TEXT
        },
        Type:{
            type: DataTypes.TEXT
        },
        ParentId:{
            type: DataTypes.INTEGER
        },
        ParentAnswer:{
            type: DataTypes.TEXT
        },
        Note:{
            type: DataTypes.TEXT
        },
        TextRefId:{
            type: DataTypes.INTEGER
        },
        Active:{
            type: DataTypes.BOOLEAN
        },
        OwnQuestion:{
            type: DataTypes.BOOLEAN
        }
    },
    {
        sequelize: sequelize,
        timestamps:true,
        tableName: "tbl_n400_practice_question",
        modelName:"N400PracticeQuestion"
    }
)

N400PracticeQuestion.belongsTo(N400PracticePart, {foreignKey:"PartId"})

module.exports = N400PracticeQuestion;