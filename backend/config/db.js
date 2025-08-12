
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

   const userModel = createUserModel(sequelize);
   const userRol = createUserRoleModel(sequelize);


    //Relaciones un usuario puede tener solo un rol
    userModel.belongsTo(userRol, { foreignKey: 'rol_id' });
    // Un rol puede tener muchos usuarios
    userRol.hasMany(userModel, { foreignKey: 'rol_id' });

async function connection() {
  try {
    await sequelize.authenticate(); // Intenta autenticar la conexión a la base de datos.
    console.log('Conexión a la base de datos establecida correctamente.'); // Mensaje de éxito al establecer la conexión.


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

    const rolChofer = await userRol.findOne({ where: { rolName: 'chofer' } });
    const rolSoporte = await userRol.findOne({ where: { rolName: 'soporte' } });
    const rolAdmin = await userRol.findOne({ where: { rolName: 'admin' } });
    const usuario3 = await userModel.create({user: 'nabril',nameUser: 'abril', lastNameUser: 'nahuat', email: 'mnahuat@example.com', rol_id: rolSoporte.rolId, password: '12345'});

    if(rolChofer){
      const usuario2 = await userModel.create({user: 'ssanchez',nameUser: 'sara', lastNameUser: 'sanchez', email: 'ssanchez@example.com', rol_id: rolChofer.rolId, password: '12345'});
    }
    const usuario = await userModel.create({user: 'mnoh',nameUser: 'maria', lastNameUser: 'noh', email: 'jmnoh@example.com', rol_id: rolAdmin.rolId, password: '1234'});
    

  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error); // Mensaje de error si falla la conexión.
  }
}



module.exports = {userModel, userRol, connection}
