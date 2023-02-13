const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

const usuariosGet = (req, res = response)=>{
    res.json({msg:'Hello World'});
}


const usuariosPost = async(req = request, res = response)=>{

    const {nombre,correo,password,rol} = req.body;
    const usuario = new Usuario({nombre,correo,password,rol});
   
    //hash password
    const salt = bcryptjs.genSaltSync();
    usuario.password =  bcryptjs.hashSync(usuario.password,salt);
    
    //guardar
    await usuario.save();
    res.json({msg:'Hello World'
            ,usuario}
    );
}

const usuariosPatch = (req, res = response)=>{
    res.json({msg:'Hello World'});
}

const usuariosDelete = (req, res = response)=>{
    res.json({msg:'Hello World'});
}

const usuariosPut = (req, res = response)=>{
    const id = req.params.id;
    console.log(req);
    res.json({msg:'Hola mundo'
                ,id});
}

module.exports = {
    usuariosGet
    ,usuariosPost
    ,usuariosPatch
    ,usuariosDelete
    ,usuariosPut
}