const bcrypt  = require('bcrypt');
const jwt = require('jsonwebtoken')
const {User} = require ('../models/User');
const {userModel} = require('../config/db.js'); // Importa el modelo de usuario desde la configuración de la base de datos.

const login = async (req, res) => {
    const {user, password} = req.body;

    try{
        // Verifica si el usuario existe

        const usuario = await userModel.findOne({where:{user, password}})

       console.log(usuario, "estoy aquiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");

        if(!usuario){
            return res.status(404).json({message: 'Usuario no encontrado'});
        }else{
            return res.status(200).json({message: 'Usuario encontrado', user: usuario});
        }

        // const token = jwt.sign(
        //     {id: usuario.id, role: usuario.rol_id},
        //     process.env.JWT_SECRET,
        //     { expiresIn: '1h' }
        // );
        
        // res.json({token})
} catch (error) {
    console.error(error);
    res.status(500).json({message: 'Error en el servidor'});
}

}

module.exports = {login};