const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto, obtenerProducto, actualizarProducto, borrarProducto, obtenerProductos} = require('../controllers/productos');
const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db-validators');
const { validarJWT, validarCampos } = require('../middlewares');


const router = Router();

//Obtener todas las categorias
router.get('/', obtenerProductos);

//Obtener una categoria por id - validacion personalizada si existe o si es valido si existe el identificador
router.get('/:id', [
  check('id','No es un ID Valido').isMongoId(),
  check('id').custom(existeProductoPorId),
  validarCampos
] , obtenerProducto);

//Crear una categoria por id
router.post('/', [
      validarJWT,
      check('nombre','El nombre es obligatorio').not().isEmpty(),
      check('categoria','No es categoria valida').isMongoId(),
      check('categoria').custom(existeCategoriaPorId),
      validarCampos], crearProducto);

//Actualizar una categoria por id
router.put('/:id',[  
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id','No es un ID Valido').isMongoId(),
    check('categoria','No es categoria valida').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    check('id').custom(existeProductoPorId),
    validarCampos
    ],actualizarProducto);

//Eliminar una categoria por id
router.delete('/:id',[
    validarJWT,
    check('id','No es un ID Valido').isMongoId(),
    check('id').custom(existeProductoPorId),
], borrarProducto);

module.exports = router;