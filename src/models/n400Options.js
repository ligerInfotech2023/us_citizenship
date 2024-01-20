const {Model, DataTypes} = require('sequelize');

const {sequelize} = require('../config/sequelizeInstance');
const N400Part = require('./n400Part');

class N400Options extends Model {}

N400Options.init(
    {
        option:{
            type: DataTypes.JSON
        }
    },
    {
        sequelize: sequelize,
        timestamps: true,
        tableName: "tbl_n400_options",
        modelName: "N400Options"
    }
)
// N400Options.belongsTo(N400Part,{foreignKey: "part_id"});

module.exports = N400Options ;