require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const caseStatusRoute = require('./src/routes/caseStatusRoute')

const app = express();

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use('/api', caseStatusRoute)

app.get('/', (req, res) => {
    res.status(200).json({status:"Success", message:"Server started successfully"})
})
const port = process.env.PORT || 2000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})
