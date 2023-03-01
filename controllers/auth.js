const { response } = require("express");
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");


const login  =  async(req , res = response) => {

    const { correo, password} = req.body;

    try {
         
        //Verificar usuario 
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
             return res.status(400).json({
                msg:'El usuario / password no son correctos.'
             })

        }

        //Validacion de estado de usuario 
        if(!usuario.estado){
            return res.status(400).json({
               msg:'El usuario / password no son correctos.'
            })

       }

       //Verificacion de contraseña
       const validPassword = bcryptjs.compareSync(password,usuario.password);

       if(!validPassword){
        return res.status(400).json({
            msg:'El usuario / password no son correctos. - password'
         })

       }

       const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });
    } catch (error) {
        res.status(500).json({msg: error });
    }



}

module.exports = {
    login
}