const { response } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');




const usuariosGet = async( req, res = response ) => {


    const query = { estado: true };
    const { limite = 5, desde = 0 } = req.query;
    
            const [ total, usuarios ] = await Promise.all([
            Usuario.countDocuments( query ),

            Usuario.find( query )
            .skip( Number( desde ) )
            .limit( Number( limite ) )
          ]);

    res.json({
        total,
        usuarios
        
    })
  }

  const usuariosPost = async( req, res = response ) => {

   
    const { nombre, correo, password, rol } = req.body;
    
    const usuario = new Usuario( { nombre, correo, password, rol } );
    
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();

    usuario.password = bcryptjs.hashSync( password, salt );

    //Guardar En DB
    await usuario.save();
    
    res.json({     
      //Respuesta   
        usuario
    })
  }

  const usuariosPut = async( req, res = response ) => {

    const { id } = req.params.id;

    const { _id, password, google, correo, ...resto } = req.body;

    //TODO: validar contra BD

    if ( password ) {

      //Encriptar la contraseña
      const salt = bcryptjs.genSaltSync();
      resto.password = bcryptjs.hashSync( password, salt );

    }   
      
      const usuario = await Usuario.findOneAndUpdate( id  , resto );

    res.json( usuario )
  }



  const usuariosPatch = ( req, res = response ) => {
    res.json({
        msg: 'patch API - Controlador'
    })
  }

  const usuariosDelete = async( req, res = response ) => {

    const { id } = req.params;

    console.log( id );

    //Fisicamente lo borramos

    // const usuario = await Usuario.findOneAndDelete({ id });
    const usuario = await Usuario.findOneAndUpdate( { _id: id }  , { estado: false } );

    res.json( usuario );
  }


  module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
  }