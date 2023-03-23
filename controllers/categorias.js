const { response } = require("express");
const { Categoria } = require('../models')


//obtener categorias - paginado - total  - populate 
const obtenerCategorias = async (req, res = response) => {
    const {limite = 5 , desde = 0 } = req.query;
    const query ={estado:true};


    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
        .populate('usuario', 'nombre correo estado')
                            .skip(Number(desde))
                            .limit(Number(limite))

    ])


    res.json({total,categorias});
}

const obtenerCategoria = async (req, res = response)=>{
    const {id} = req.params;
    const categoria = await Categoria.findById(id)
    .populate('usuario', 'nombre correo estado');
    res.json(categoria);
}

//obtener categoria  - populate 

const crearCategoria = async (req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre});

    if(categoriaDB){
        return res.status(400).json({
            msg:`La categoria ${nombre}, ya existe en la base de datos`
        });

   
    }
    const data  = {
        nombre
        ,usuario: req.usuario._id
     };

     const categoria = new Categoria(data);

     await categoria.save();

     res.status(201).json(categoria);

}

//actualizar categoria - solo nombre 

const actualizarCategoria =  async(req, res = response)=>{
    const { id } = req.params;
    const {estado, usuario , ...data} = req.body;
    
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, {new:true});
    res.json(categoria);
}

//Borrar categoria  - cambio a estado false
const borrarCategoria = async (req, res = response)=>{
    const {id} = req.params;
    const usuarioLogueado = req.usuario;

    const categoria = await Categoria.findByIdAndUpdate(id,{estado:false}, {new:true});
    res.json({categoria, usuarioLogueado});
 

}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}