const express = require('express');
const path= require('path');




const uploadFile= function(req, res) {
  let sampleFile=req.files.ficherito;
  let uploadPath;
  let extension=path.extname(sampleFile.name);
  

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({msg:'Error no esperado'});
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.sampleFile;
  uploadPath = path.join( __dirname + '../uploads' + sampleFile.name);

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).json({msg:err});

    res.json({msg:`Fichero con extension ${extension} subido a ${uploadPath}`});
  });
};

module.exports = {uploadFile}