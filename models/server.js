const express = require('express');
const cors = require('cors');
class Server{

        constructor(){
            this.app   = express();
            this.port = process.env.PORT || 8080;
            this.usuariosPath = '/api/usuarios';
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
}
module.exports = Server;
