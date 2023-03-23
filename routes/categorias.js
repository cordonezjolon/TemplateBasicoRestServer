const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');
const { validarJWT, validarCampos } = require('../middlewares');


const router = Router();

//Obtener todas las categorias
router.get('/',[validarJWT,validarCampos], obtenerCategorias);

//Obtener una categoria por id - validacion personalizada si existe o si es valido si existe el identificador
router.get('/:id', [
  validarJWT,
  check('id','No es un ID Valido').isMongoId(),
  check('id').custom(existeCategoriaPorId),
  validarCampos
] , obtenerCategoria);

//Crear una categoria por id
router.post('/', [
      validarJWT,
      check('nombre','El nombre es obligatorio').not().isEmpty(),
      validarCampos], crearCategoria);

//Actualizar una categoria por id
router.put('/:id',[  
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id','No es un ID Valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
    ],actualizarCategoria);

//Eliminar una categoria por id
router.delete('/:id',[
    validarJWT,
    check('id','No es un ID Valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
], borrarCategoria);

module.exports = router;