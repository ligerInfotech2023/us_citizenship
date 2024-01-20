const {Model, DataTypes} = require('sequelize');

const {sequelize} = require('../config/sequelizeInstance');
const { SmallTalk_Category } = require('../helper/enum');

class SmallTalk extends Model {}

SmallTalk.init(
    {
        category:{
            type: DataTypes.ENUM,
            values: Object.values(SmallTalk_Category)
        },
        question:{
            type: DataTypes.TEXT
        },
        response:{
            type: DataTypes.TEXT
        }
    },
    {
        sequelize: sequelize,
        timestamps:true,
        tableName: "tbl_smalltalk",
        modelName: "SmallTalk"
    }
)

module.exports = SmallTalk;

