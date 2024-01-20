const {Model, DataTypes} = require('sequelize');

const { sequelize } = require('../config/sequelizeInstance');

class N400PracticePart extends Model {}

N400PracticePart.init(
    {
        Text:{
            type: DataTypes.TEXT
        }
    },
    {
        sequelize: sequelize,
        timestamps: true,
        tableName: "tbl_n400_practice_part",
        modelName: "N400PracticePart"
    }
)

module.exports = N400PracticePart;