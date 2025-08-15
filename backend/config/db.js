
require('dotenv').config(); // Importa el módulo dotenv para cargar las variables de entorno desde un archivo .env.
const createUserModel = require('../models/User'); // Importa la función para crear el modelo de usuario desde el archivo User.js.
const createUserRoleModel = require('../models/UserRoles');
const createIncidenciaModel = require('../models/Incidencia')
const createModuloModel = require('../models/Modulo')
const {Sequelize, where} = require('sequelize'); // Importa el módulo pg para manejar la conexión a la base de datos PostgreSQL.

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  logging: console.log,
});

   const userModel = createUserModel(sequelize);
   const userRol = createUserRoleModel(sequelize);
   const modulo = createModuloModel(sequelize);
   const incidencia = createIncidenciaModel(sequelize);


    //Relaciones un usuario puede tener solo un rol
    userModel.belongsTo(userRol, { foreignKey: 'rol_id' });
    // Un rol puede tener muchos usuarios
    userRol.hasMany(userModel, { foreignKey: 'rol_id' });
    //un chofer puede tener varios modulos 
    userModel.hasMany(modulo,{foreignKey:'chofer_id', as:'modulos'});
    //un modulo puede tener solo un chofer
    modulo.belongsTo(userModel,{foreignKey:'chofer_id', as: 'chofer'})
    //un modulo puede tener varias incidencias
    modulo.hasMany(incidencia,{foreignKey:'modulo_id', as: 'incidencias'});
    //una incidencia puede tene un modulo
    incidencia.belongsTo(modulo,{foreignKey:'modulo_id', as:'moduloIncidencia'});
    

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

    // const rolChofer = await userRol.findOne({ where: { rolName: 'chofer' } });
    // const rolSoporte = await userRol.findOne({ where: { rolName: 'soporte' } });
    // const rolAdmin = await userRol.findOne({ where: { rolName: 'admin' } });

  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error); // Mensaje de error si falla la conexión.
  }
}



module.exports = {userModel, userRol, connection}
