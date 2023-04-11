const { v4: uuidv4 } = require('uuid');
uuidv4();
const path = require('path');
const subirArchivo = (files,extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'] , carpeta = '') => {

   return new Promise((resolve, reject) => {
    const { archivo } = files;

    const nombreCortado = archivo.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    //Validar extension
    if (!extensionesValidas.includes(extensionArchivo)) {
        return reject (`La extension ${extensionArchivo} No es una extension permitida  ${extensionesValidas}`);
    }

    const nombreTemp = uuidv4() + '.' + extensionArchivo;

    const uploadPath = path.join(__dirname , '../uploads/', carpeta , nombreTemp);

    archivo.mv(uploadPath,  (err) => {
        if (err) {
            return reject(err);
        }

       resolve( nombreTemp);
    });


});


}

module.exports = {
    subirArchivo
}
