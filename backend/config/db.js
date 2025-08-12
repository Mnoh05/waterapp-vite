
require('dotenv').config(); // Importa el módulo dotenv para cargar las variables de entorno desde un archivo .env.
const createUserModel = require('../models/User'); // Importa la función para crear el modelo de usuario desde el archivo User.js.
const createUserRoleModel = require('../models/UserRoles');
const {Sequelize, where} = require('sequelize'); // Importa el módulo pg para manejar la conexión a la base de datos PostgreSQL.

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  logging: console.log,
});

let userModel = null;
let userRol = null;

async function connection() {
  try {
    await sequelize.authenticate(); // Intenta autenticar la conexión a la base de datos.
    console.log('Conexión a la base de datos establecida correctamente.'); // Mensaje de éxito al establecer la conexión.
    userModel = createUserModel(sequelize);
    userRol = createUserRoleModel(sequelize);

    console.log('User:', userModel);
    console.log('UserRol:', userRol);


    //Relaciones un usuario puede tener solo un rol
    userModel.belongsTo(userRol, { foreignKey: 'rol_id' });
    // Un rol puede tener muchos usuarios
    userRol.hasMany(userModel, { foreignKey: 'rol_id' });

    await sequelize.sync();
    console.log('Modelo de usuario sincronizado con la base de datos.'); // Mensaje de éxito al sincronizar el modelo de usuario.
    
    //Se agrego informacion de los tres tipos de usuario que existira
    const rolesDefault = ['admin','chofer', 'soporte'];
    for (const rolName of rolesDefault) {
      const [rol, created] = await userRol.findOrCreate({
        where: { rolName },
        defaults: { rolName }
      });
    }

    const usuario = await userModel.create({user: 'mnoh',nameUser: 'maria', lastNameUser: 'noh', email: 'jmnoh@example.com', rol_id: rol.rolId, password: '1234'});
    console.log('Usuario creado:', usuario.toJSON());

  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error); // Mensaje de error si falla la conexión.
  }
}



module.exports = connection
