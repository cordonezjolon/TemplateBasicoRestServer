const { Router } = require('express');
const { usuariosPut, usuariosDelete,usuariosGet,usuariosPatch,usuariosPost } = require('../controllers/user')
const router = Router();

router.get('/',  usuariosGet)

  router.post('/', usuariosPost)
  
router.patch('/',usuariosPatch)
  
router.delete('/', usuariosDelete)

router.put('/:id', usuariosPut)
module.exports= router;