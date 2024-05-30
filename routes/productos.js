const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto } = require('../controllers/productos');

const { existeProductoPorID, existeCategoriaPorID } = require('../helpers/db-validators');

const router = Router();

/*
* {{url}}/api/productos
*/

//Obtener todas las productos - publico
router.get('/', obtenerProductos);


//Obtener 1 categoria por ID - Publico
router.get('/:id', [

    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeProductoPorID),
    validarCampos

], obtenerProducto);



//Crear Producto - privado - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un ID de Mongo Valido').isMongoId(),
    check('categoria').custom(existeCategoriaPorID),
    validarCampos
], crearProducto);


//Actualizar Producto por ID - privado - Cualquier con token valido
router.put('/:id', [
    validarJWT,
    // check('categoria', 'No es un ID de Mongo Valido').isMongoId(),
    check('id').custom(existeProductoPorID),
    validarCampos
], actualizarProducto);


//Borrar Producto por ID - privado - Solo admin

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeProductoPorID),
    validarCampos

], borrarProducto);




module.exports = router;