const {Sequelize, Model, DataTypes} = require('sequelize')
// const {db} = require('./index')
const {Classification, SubClassification} = require('../helper/enum')

// const sequelize = global.sequelize
const {sequelize} = require('../config/sequelizeInstance')

class QuestionV1 extends Model {}

QuestionV1.init(
    {
        QuestionNro: {
            type: DataTypes.INTEGER,
            primaryKey:true,
            allowNull: false,
            unique: true,
        },
        Question: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        Classification:{
            type: DataTypes.ENUM,
            values: Object.values(Classification)
        },
        Practiced: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        TestPracticed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        WrongAnswered: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        TestWrongAnswered: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        SubClassification:{
            type: DataTypes.ENUM,
            values: Object.values(SubClassification)
        },
        MultiSelect: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        Status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        Type: {
            type: DataTypes.TEXT,
        },
        Dynamic: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        Market: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        MarkCount: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        ExtraInformation: {
            type: DataTypes.TEXT,
        },
        Favourite: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        Seen: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        Bookmarked: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },

    },
    {
        sequelize: sequelize,
        timestamps: true,
        tableName: 'question_v1',
        modelName: 'QuestionV1',
    }
)

module.exports = QuestionV1