const {Model, DataTypes} = require('sequelize');

const { sequelize } = require('../config/sequelizeInstance');

class N400Part extends Model {}

N400Part.init(
    {
        partTitle:{
            type: DataTypes.TEXT,
        },
        option:{
            type: DataTypes.JSON,
            allowNull:false
        }
    },
    {
        sequelize: sequelize,
        timestamps: true,
        tableName: "tbl_n400_part",
        modelName: "N400Part"
    }
)

module.exports = N400Part;