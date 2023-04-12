const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, monstrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads');
const { validarColeccionesPermitidas } = require('../helpers');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarArchivoSubir } = require('../middlewares');



const router = Router();

router.post('/', validarArchivoSubir ,cargarArchivo);

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom( c => validarColeccionesPermitidas( c, ['usuarios', 'productos'])),
    validarCampos
], actualizarImagenCloudinary);
//], actualizarImagen);

router.get('/:coleccion/:id', [
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom( c => validarColeccionesPermitidas( c, ['usuarios', 'productos'])),
    validarCampos
], monstrarImagen)


module.exports= router;