const { Schema , model } =  require('mongoose');

const CategoriaSchema = Schema({
    nombre: {
        type:String,
        required: [true, 'El nombre de la categoria es obligatorio.']
    },
    estado: {
        type:Boolean,
        required: true,
        default: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

module.exports = model('Categoria', CategoriaSchema);