const {Sequelize, Model, DataTypes, DATE} = require('sequelize')

// const sequelize = global.sequelize
const {sequelize} = require('../config/sequelizeInstance')

class AnswerV1 extends Model {}

AnswerV1.init(
    {
        Text:{
            type: DataTypes.TEXT,
        },
        Lang:{
            type: DataTypes.TEXT,
            defaultValue: 'en'
        },
        IsOk:{
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        Active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        IsFake: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        Question_id:{
            type: DataTypes.INTEGER,
            references:{
                model:"question_v1",
                key:"QuestionNro"
            }
        },
        AOrder: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        AudioOrder: {
            type: DataTypes.TEXT,
        },
    },
    {
        sequelize: sequelize,
        modelName: 'AnswerV1',
        tableName: 'answer_v1',
        timestamps: true
    }
)

module.exports = AnswerV1;