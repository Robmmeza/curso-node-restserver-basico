
const { Router } = require('express');
const { check } = require('express-validator');


const { usuariosGet, 
        usuariosPost, 
        usuariosPut,
        usuariosPatch,
        usuariosDelete } = require('../controllers/usuarios');


const { validarCampos,
        validarJWT,
        esAdminRole,
        tieneRole      } = require('../middlewares');

const { esRolValido, emailExiste, existeUsuarioPorID } = require('../helpers/db-validators');

const router = Router();

  //GET
  router.get('/', usuariosGet);

  //POST  
  router.post('/',[
      
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y mas de 6 letras').isLength({ min:6 }),
    check('correo').custom( emailExiste ),    
    check('rol').custom( esRolValido ),
    validarCampos
  ], usuariosPost)

  //PUT
  router.put('/:id',[

      check('id', 'No es un ID Valido').isMongoId(),
      check('id').custom( existeUsuarioPorID ),
      check('rol').custom( esRolValido ),
      validarCampos
  ], usuariosPut);

  //PATCH
  router.patch('/', usuariosPatch);

  //DELETE
  router.delete('/:id', [ 
    validarJWT,
    // esAdminRole, 
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'No es un ID Valido').isMongoId(),
    check('id').custom( existeUsuarioPorID ),
    validarCampos
  ], usuariosDelete);

  




module.exports = router;
