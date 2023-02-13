const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
class Server{

        constructor(){
            this.app   = express();
            this.port = process.env.PORT;
            this.usuariosPath = '/api/usuarios';

            this.conectarDB();
            
            //Middlewaresl+
            this.middlewares();

            //Rutas del sitio
            this.routes();

        }
        routes(){
            this.app.use(this.usuariosPath,require('../routes/user'))
        }
        listen(){
            this.app.listen(this.port, ()=>{
                console.log(`Aplicacion iniciada en el puerto ${this.port}`)
            });
        }
        middlewares(){
            this.app.use(cors());
            this.app.use(express.json());
            this.app.use(express.static('public'));

        }

        async conectarDB(){
            await dbConnection();
        }
}
module.exports = Server;