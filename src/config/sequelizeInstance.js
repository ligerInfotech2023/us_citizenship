const { Sequelize, Op, QueryTypes } = require('sequelize');


const env = process.env.NODE_ENV || 'development'
let config = require('./config.json')[env]

global.config = config
let sequelize = new Sequelize(config.DB.database, config.DB.username, config.DB.password, config.DB)

sequelize.authenticate()
    .then(() => {
        console.log('Connection Estlablished with database');
    }).catch((err) => {
        console.log('Db Connection Error: ',err.message);
})


sequelize = sequelize;
sequelize.Sequelize = Sequelize;
sequelize.Op = Op;
sequelize.QueryTypes = QueryTypes;



module.exports = {sequelize}