const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario')

const validarJWT = async (req = request, resp = response, next) =>{
    const token = req.header('x-token');

    if(!token){
        return resp.status(401).json({
            msg:'No hay token valido.'
        })
    }
    
    try {
        const {uid} = jwt.verify(token,process.env.SECRETKEY);
        
        const usuario = await Usuario.findById(uid);
        
        if(!usuario){
            return resp.status(401).json({
                msg:'No hay token valido.'
            })
        }
        if(!usuario.estado){
            return resp.status(401).json({
                msg:'No hay token valido.'
            })
        }


        req.usuario = usuario;

        next();
    } catch (error) {
        
        return resp.status(401).json({
            msg:'No hay token valido.'
        })
    }

}

module.exports = {
    validarJWT
}