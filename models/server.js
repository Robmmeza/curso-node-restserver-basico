
const express = require('express');
const cors = require('cors');

class Server {


    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.usuariosPath = '/api/usuarios';

        //Middlewares
        this.middleWares();

        //Rutas de la app
        this.routes();
    }

    middleWares() {

        //CORS

        this.app.use( cors() );

        //Lectura y parseo de Body

        this.app.use( express.json() );

        // Directorio public
        this.app.use( express.static('public') );
    }

    routes() {

        this.app.use(this.usuariosPath, require('../routes/usuarios'));
        
    }


    listen() {

        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto: ', this.port );
        } );
    }



}

module.exports = Server;
