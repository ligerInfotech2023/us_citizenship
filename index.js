require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./src/routes/index')
const env = process.env.NODE_ENV || 'development'
let config = require('./src/config/config.json')[env]
global.config = config


const { sequelize} = require('./src/config/sequelizeInstance')
const { HandleErrorMessage } = require('./src/middleware/validatorMessage');

const fs = require('fs');
// const { insertData } = require('./insertData');

// const jsonData = JSON.parse(fs.readFileSync('n400_practice_question.json', 'utf8'));

// Re-sync database
sequelize.sync({alter: true,}).then(() => {
    // insertData(jsonData)    
    console.log('re-sync db');
}).catch(err => {
    console.log('db Error: ',err);
    throw new Error(err)
})

const app = express();

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use('/api', routes)

app.get('/', (req, res) => {
    res.status(200).json({status:"Success", message:"Server started successfully"})
})
app.use(HandleErrorMessage)
const port = process.env.PORT || 2000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})
