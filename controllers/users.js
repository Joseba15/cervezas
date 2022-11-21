const {request, response} = require('express')
const User = require('../models/usuario')
const bcryptjs = require('bcryptjs')

const getUsers= async(req,res) =>{
    const { limit=5, skip=0} = req.query;
    const users = await User.find().limit(Number(limit)).skip(Number(skip))
    res.json({ limit, skip, users})
}
const addUser = async(req, res) => {

    const { name, email, password, rol} = req.body;
    

    // Encriptar la contraseña
    const user = new User({name, email, password, rol})
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );


    
    await user.save();

    res.json(
        user
    )

}

const delUser = async(req = request, res= response) => {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id)
    res.json(user)
}

module.exports = {addUser, getUsers,delUser}