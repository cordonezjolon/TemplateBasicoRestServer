const { response, request } = require('express');

const usuariosGet = (req, res = response)=>{
    res.json({msg:'Hello World'});
}


const usuariosPost = (req = request, res = response)=>{
    const { nombre, edad = 0, apellido } = req.query;
    const body = req.body;
    res.json({msg:'Hello World'
            ,body
            ,nombre
            ,edad
            ,apellido}
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