
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { login, googleSignIn } = require('../controllers/auth');

const router = Router();

//POST
router.post('/login', [
  check('correo', 'El correo es obligatorio').isEmail(),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
  validarCampos
], login);


//POST
router.post('/google', [
  check('id_token', 'El id_token es necesario').not().isEmpty(),

  validarCampos
], googleSignIn);


module.exports = router;
