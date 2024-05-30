
const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria } = require('../controllers/categorias');

const { existeCategoriaPorID } = require('../helpers/db-validators');



const router = Router();

/*
* {{url}}/api/categorias
*/

//Obtener todas las categorias - publico
router.get('/', obtenerCategorias);


//Obtener 1 categoria por ID - Publico
router.get('/:id', [

    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorID),
    validarCampos

], obtenerCategoria);


//Crear Categoria - privado - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);


//Actualizar Categoria por ID - privado - Cualquier con token valido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorID),
    validarCampos
], actualizarCategoria);


//Borrar Categoria por ID - privado - Solo admin

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorID),
    validarCampos

], borrarCategoria);







module.exports = router;