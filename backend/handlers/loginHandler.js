const { userModel, userRol, modulo, tiempo } = require("../config/db.js");
const bcrypt = require("bcrypt");

//funcion para encontrar el usuario
const getUserLogin = async (user) => {
  const usuario = await userModel.findOne({ where: { user } });
  return usuario;
};
//funcion para crear usuario
const createUser = async (
  user,
  nameUser,
  lastNameUser,
  email,
  rol_id,
  password
) => {
  user = user.toLowerCase();
  const hash = await bcrypt.hash(password, 10);

  console.log(user, nameUser, lastNameUser, email, rol_id, password);
  try {
    const newUser = await userModel.create({
      user,
      nameUser,
      lastNameUser,
      email,
      rol_id,
      password: hash,
    });
    return newUser;
  } catch (error) {
    return error.message;
  }
};

const changePassword = async (usuario, user_id, newPassword) => {
  const nuevaHash = await bcrypt.hash(newPassword, 10);
  await usuario.update({ password: nuevaHash });
  return nuevaHash;
};

const allUsersChoferes = async () => {
  try {
    const allUsers = await userModel.findAll({
      where: { rol_id: 4 },
      include :[
      {
        model: modulo,
        as:'modulos',
        attributes:['nameModulo'],
        include : [ //inclusion anidad trae los valores de los tiempos
          {
            model: tiempo,
            as:'tiempos',
            required: false,
          }
        ]
      },

    ]
    });

    return allUsers;
  } catch (error) {
    return error.message;
  }
};

module.exports = { getUserLogin, createUser, changePassword, allUsersChoferes };
