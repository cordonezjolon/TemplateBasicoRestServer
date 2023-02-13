const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { usuariosPut, usuariosDelete,usuariosGet,usuariosPatch,usuariosPost } = require('../controllers/user');
const { esRoleValido, correoExiste } = require('../helpers/db-validators');



const router = Router();

router.get('/',  usuariosGet)

  router.post('/', [
    check('nombre','El nombre es obligatorio.').not().isEmpty(),
    check('password','El password es obligatorio y mas de 6 letras.').isLength({min:6}),
    check('correo','El correo no es valido.').isEmail(),
    check('correo').custom(correoExiste),
    check('rol').custom(esRoleValido),
    validarCampos,
  ] , usuariosPost)
  
router.patch('/',usuariosPatch)
  
router.delete('/', usuariosDelete)

router.put('/:id', usuariosPut)
module.exports= router;