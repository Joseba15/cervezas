const express = require('express')
const router = express.Router()
const { addUser, getUsers, delUser} = require('../controllers/users')
const { check } = require('express-validator')
const { validateFields } = require('../helpers/validate-fields')
const { isValidRol, existEmail, existsUser } = require('../helpers/db-validators')

router.get('/', getUsers)
// router.get('/:id', getUser)
router.post('/',[
    check('email','Email is invalid').isEmail(),
    check('email').custom(existEmail),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6, max: 12 }),
    check('name','Name is mandatory').not().isEmpty(),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( isValidRol),
    validateFields
] ,addUser)

router.delete('/:id', [
    check('id','No es un id correcto').isMongoId(),
    check('id').custom(existsUser),
    validateFields
],delUser)
// router.put('/:id', editUser)

module.exports = router