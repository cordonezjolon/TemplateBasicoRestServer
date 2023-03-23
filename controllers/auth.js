const { response, json } = require("express");
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");


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

const googleSingIn = async(req, res = response) => {
    const {id_token} = req.body;


    try {
        const {nombre,img,correo} = await googleVerify(id_token);

        let usuario = await Usuario.findOne({correo});

        if(!usuario){
            //Crearlo por que no existe
            const data = {
                nombre,
                correo,
                password:':)',
                img,
                google:true
            }
            usuario = new Usuario(data);
            await usuario.save();
        }

        //Validar si usuario en base de datos esta inactivo

        if(!usuario.estado){
            return res.status(401).json({
               msg:'Hable con el administrador, usuario bloqueado.' 
            })
        }

        //Generar token para autorizacion 
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });

    } catch (error) {
        res.status(400).json({
            ok:false
            ,msg:'El token no se pudo verificar. '  + error
        })
        
    }

}

module.exports = {
    login,
    googleSingIn
}