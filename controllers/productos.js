const { response } = require("express");
const { Producto } = require('../models')


//obtener categorias - paginado - total  - populate 
const obtenerProductos = async (req, res = response) => {
    const {limite = 5 , desde = 0 } = req.query;
    const query ={estado:true};


    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        .populate('usuario', 'nombre correo estado')
        .populate('categoria', 'nombre')
                            .skip(Number(desde))
                            .limit(Number(limite))

    ])


    res.json({total,productos});
}

const obtenerProducto = async (req, res = response)=>{
    const {id} = req.params;
    const producto = await Producto.findById(id)
    .populate('usuario', 'nombre correo estado')
    .populate('categoria', 'nombre');
    res.json(producto);
}

//obtener categoria  - populate 

const crearProducto = async (req, res = response) => {

    const {estado,usuario ,...dataIn} = req.body;

    const productoDB = await Producto.findOne({ nombre: dataIn.nombre.toUpperCase() });

    if(productoDB){
        return res.status(400).json({
            msg:`El producto ${dataIn.nombre}, ya existe en la base de datos`
        });

   
    }
    const data  = {
        nombre : dataIn.nombre.toUpperCase(),
        descripcion : dataIn.descripcion.toUpperCase(),
        categoria : dataIn.categoria,
        usuario: req.usuario._id
     };

     const producto = new Producto(data);

     await producto.save();

     res.status(201).json(producto);

}

//actualizar categoria - solo nombre 

const actualizarProducto =  async(req, res = response)=>{
    const { id } = req.params;
    const {estado, usuario , ...data} = req.body;
    
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const productoDB = await Producto.findOne({ nombre: data.nombre.toUpperCase() });

    if(productoDB){
        return res.status(400).json({
            msg:`El producto ${data.nombre}, ya existe en la base de datos`
        });
    }
    const producto = await Producto.findByIdAndUpdate(id, data, {new:true});
    res.json(producto);
}

//Borrar categoria  - cambio a estado false
const borrarProducto = async (req, res = response)=>{
    const {id} = req.params;
    const usuarioLogueado = req.usuario;

    const producto = await Producto.findByIdAndUpdate(id,{estado:false}, {new:true});
    res.json({producto, usuarioLogueado});
 

}




module.exports = {
    crearProducto,
    obtenerProducto,
    obtenerProductos,
    actualizarProducto,
    borrarProducto
}