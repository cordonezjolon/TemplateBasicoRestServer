const { response } = require("express")
const { model } = require("mongoose");

const esAdminRole = (req, res = response, next) => {

    if(!req.usuario){
        return res.status(500).json({
            msg: 'Se quiere verificar rol sin validar token previamente',
        });
    }
    
    const { rol , nombre} = req.usuario;
    
    if(rol!== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg:'El usuario no es administrador',
        })
    }
    
    

    next();
    
}


const tieneRole =( ...roles ) =>{
    
    return (req, res = response , next) => {
        if(!req.usuario){
            return res.status(500).json({
                msg: 'Se quiere verificar rol sin validar token previamente',
            });
        } 
        
        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`,
            });
        }

        next();
    }



    
    
}
module.exports = {
    esAdminRole,
    tieneRole
}