const { connect } = require('diskdb');
const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const fileUpload = require('express-fileupload');

const app = express()
// require('./db')
const cervezas = require('./routes/cervezas')
const users = require('./routes/users')
const auth = require('./routes/auth')
const upload = require('./routes/upload');
// DATABASE CONNECTION
async function connectAtlas(){
    await dbConnection()
}
connectAtlas()
//MIDDLEWARE
app.use(express.json())
app.use(fileUpload({
    useTempFile:true,
    tempFileDir : '/temp'
}));



//ROUTES
app.use('/cervezas', cervezas)
app.use('/users', users)
app.use('/auth', auth)
app.use('/upload',upload)


app.listen(process.env.PORT)