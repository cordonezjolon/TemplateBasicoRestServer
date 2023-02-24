const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { usuariosPut, usuariosDelete,usuariosGet,usuariosPatch,usuariosPost, usuariosGetById } = require('../controllers/user');
const { esRoleValido, correoExiste, existeUsuarioPorId } = require('../helpers/db-validators');



const router = Router();

router.get('/',  usuariosGet);
router.get('/:id', [  
  check('id','No es un ID Valido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  validarCampos
] ,  usuariosGetById);

  router.post('/', [
    check('nombre','El nombre es obligatorio.').not().isEmpty(),
    check('password','El password es obligatorio y mas de 6 letras.').isLength({min:6}),
    check('correo','El correo no es valido.').isEmail(),
    check('correo').custom(correoExiste),
    check('rol').custom(esRoleValido),
    validarCampos,
  ] , usuariosPost)
  
router.patch('/',usuariosPatch)
  
router.delete('/:id', [
  check('id','No es un ID Valido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  validarCampos
],  usuariosDelete)

router.put('/:id',[
  check('id','No es un ID Valido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  check('rol').custom(esRoleValido),
  validarCampos
], usuariosPut)
module.exports= router;