const {DataTypes} = require ('sequelize'); 
const sequelize = require('../config/db'); // Importa la configuración de la base de datos

const createUserRoleModel = (sequelize) => {


const UserRole = sequelize.define('UserRole', {
  rolId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  rolName:{
    type: DataTypes.STRING(50),
    allowNull: false
  }
},
  {
    tableName: 'userRoles', // Define el nombre de la tabla en la base de datos
    timestamps: false // Desactiva los campos de marca de tiempo (createdAt, updated
  }
);
return UserRole;
}
module.exports = createUserRoleModel;
// Este modelo representa la tabla 'user_roles' en la base de datos y define las columnas y sus tipos de datos.