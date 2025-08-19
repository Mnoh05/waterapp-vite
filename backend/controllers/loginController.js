
const jwt = require("jsonwebtoken");
const { createUser, getUserLogin, changePassword} = require ('../handlers/loginHandler.js')
const { userModel } = require("../config/db.js"); // Importa el modelo de usuario desde la configuración de la base de datos.
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { user, password } = req.body;
  try {
    // Verifica si el usuario existe
    const usuario = await getUserLogin(user); 
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    //para validar la contraseña
    const coincide = await bcrypt.compare(password, usuario.password) //Primero va la contraseña plana y lueho el que esta encriptado
    if(!coincide){
      return res.status(404).json({message: "Contraseña incorrecta"});
    }

    // const token = jwt.sign(
    //   { id: usuario.id, role: usuario.rol_id },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "1h" }
    // );
    // res.json({ token });
    return res.status(200).json({message:"Usuario encontrado"})

  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const createNewUser = async (req, res) => {

  try {
    const {user, nameUser, lastNameUser, email, rol_id, password} = req.body;

    const newUser = await createUser (user, nameUser, lastNameUser, email, rol_id, password);

    return res.status(200).json(newUser);

  } catch (error) {
    return res.status(404).json({message: "Error al crear el usuario"});
  }
}

const resetPassword = async (req, res) => {
  const { user_id,  newPassword } = req.body;
  if (!user_id || !newPassword) {
    return res.status(400).json({ message: 'Faltan datos requeridos' });
  }

  try {
      const usuario = await userModel.findByPk(user_id);

      const coincide = await bcrypt.compare(newPassword, usuario.password)

      if(coincide){
        return res.status(400).json({ message: 'La nueva contraseña es la misma que la anterior' });
      }

      if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' }); }

      const nuevoPassword = await changePassword(usuario, user_id, newPassword);
      res.status(200).json(nuevoPassword, { message: 'Contraseña actualizada correctamente' });
    
  } catch (error) {
    return res.status(404).json({message: "Error al crear el usuario"});
  }
  
}

module.exports = { login, createNewUser, resetPassword };
