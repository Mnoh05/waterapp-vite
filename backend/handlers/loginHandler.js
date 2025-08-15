const { userModel, userRol } = require("../config/db.js");
const bcrypt = require("bcrypt");


//funcion para encontrar el usuario
const getUserLogin = async (user) => {
    const usuario = await userModel.findOne({ where: { user} });
    return usuario;
}
//funcion para crear usuario
const createUser = async (user, nameUser, lastNameUser, email, rol_id, password) =>{
    user = user.toLowerCase()
    const hash = await bcrypt.hash(password, 10);


    console.log(user, nameUser, lastNameUser, email, rol_id, password);
     try {

        const newUser = await userModel.create({user, nameUser, lastNameUser, email, rol_id, password: hash})
        return newUser;
     } catch (error) {
        return (error.message)
     }


}

module.exports = {getUserLogin, createUser}