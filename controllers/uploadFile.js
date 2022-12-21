const express = require('express');
const path= require('path');
const { v4: uuidv4 } = require('uuid');



const uploadFile= function(req, res) {
  
  //let extension=path.extname(sampleFile.name);
  //let extension = file.name.split('.').pop();q

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({msg:'Error no esperado'});
  }

  // The name of the input field (i.e. "file") is used to retrieve the uploaded file
  const {file} = req.files;

  const allowedExtensions = ['.jpg','.jpeg','.png']
  const extension=path.extname(file.name);

  const fileName = uuidv4()+extension
  const uploadPath = path.join( __dirname , '../uploads' , fileName);

  // Use the mv() method to place the file somewhere on your server
 
  if (!allowedExtensions.includes(extension)) {
    return res.status(400).json({})
  }
  
  file.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).json({msg: err});

    res.json({msg:'ok'});
  });
};

module.exports = {uploadFile}