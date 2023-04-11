const path = require('path');
const fs = require('fs');
const { subirArchivo } = require('../helpers');
const { Usuario, Producto } = require('../models');
const { response } = require('express');    

const cargarArchivo = async (req, res = response) => {
    //Procesar la imagen
    try {
        
            const pathCompleto = await subirArchivo(req.files , ['jpg','png','jpeg','gif'] , 'imgs'  );
            
            res.json({
                path:  pathCompleto
            });
        
    } catch (msg) {
        res.status(400).json({msg});
    }

    
}
const actualizarImagen = async (req, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if(!modelo){
                return res.status(400).json({msg: `No existe un usuario con el id ${id}`});
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if(!modelo){
                return res.status(400).json({msg: `No existe un producto con el id ${id}`});
            }
            break;
        default:
            return res.status(500).json({msg: 'Se me olvido validar esto'});
    }

    //Limpiar imagenes previas
    if(modelo.img){
        //Hay que borrar la imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if(fs.existsSync(pathImagen)) {
            fs.unlinkSync(pathImagen);
        }
        
    }

    const nombre = await subirArchivo(req.files , undefined , coleccion  );
    modelo.img = nombre;

    await modelo.save();

    res.json(
        modelo
    );
}


const monstrarImagen = async (req, res = response) => {
    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if(!modelo){
                return res.status(400).json({msg: `No existe un usuario con el id ${id}`});
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if(!modelo){
                return res.status(400).json({msg: `No existe un producto con el id ${id}`});
            }
            break;
        default:
            return res.status(500).json({msg: 'Se me olvido validar esto'});
    }

    //Validar modelo
    if(modelo.img){
        //Hay que borrar la imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);

        if(fs.existsSync(pathImagen)) {
            return res.sendFile(pathImagen);
        }
    }

    res.sendFile(path.join(__dirname, '../assets/noImage.jpg'));
}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    monstrarImagen
}
