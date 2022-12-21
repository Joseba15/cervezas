const express = require('express');
const router=express.Router()
const {uploadFile} = require ('../controllers/uploadFile')


router.post('/',uploadFile);


module.exports=router