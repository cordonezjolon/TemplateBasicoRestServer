const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const  { login, googleSingIn } = require('../controllers/auth')
const { esRoleValido, correoExiste, existeUsuarioPorId } = require('../helpers/db-validators');



const router = Router();

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos,
],   login);

router.post('/google', [
    check('id_token', 'El id_token es necesario').not().isEmpty(),
    validarCampos,
],   googleSingIn);

module.exports= router;