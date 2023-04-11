const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');
class Server{

        constructor(){
            this.app   = express();
            this.port = process.env.PORT;

            this.paths = {
                auth: '/api/auth',
                buscar : '/api/buscar',
                categorias: '/api/categorias',
                usuarios : '/api/usuarios',
                productos : '/api/productos',
                uploads : '/api/uploads',
            }

            this.conectarDB();
            
            //Middlewaresl+
            this.middlewares();

            //Rutas del sitio
            this.routes();

        }
        routes(){
            this.app.use(this.paths.auth,require('../routes/auth'))
            this.app.use(this.paths.buscar,require('../routes/buscar'))
            this.app.use(this.paths.categorias,require('../routes/categorias'))
            this.app.use(this.paths.usuarios,require('../routes/user'))
            this.app.use(this.paths.productos,require('../routes/productos'))
            this.app.use(this.paths.uploads,require('../routes/uploads'))
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
            this.app.use(fileUpload({
                useTempFiles : true,
                tempFileDir : '/tmp/',
                createParentPath: true
            }));

        }

        async conectarDB(){
            await dbConnection();
        }
}
module.exports = Server;