const {DataTypes} = require ('sequelize'); // Importa DataTypes de Sequelize para definir los tipos de datos del modelo
const sequelize = require('../config/db'); // Importa la configuración de la base de datos

const createUserModel = (sequelize) => { // Define la función para crear el modelo de usuario

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,// Define el tipo de dato como entero
        autoIncrement: true, // El ID se incrementa automáticamente
        primaryKey: true, // Define el ID como clave primaria
        unique: true
    },
    user:{
        type: DataTypes.STRING(50), // Define el  usuario 
        allowNull: false // No permite valores nulos

    },
    nameUser: {
        type: DataTypes.STRING(50), // Define el nombre del usuario
        allowNull: false 
    },
    lastNameUser: {
        type: DataTypes.STRING(50), 
        allowNull: false 
    },
    email: {
        type: DataTypes.STRING(100), 
        allowNull: false, 
        isLowerCase: true,
        unique: true 
    },
    rol_id: {
        type: DataTypes.INTEGER, // Define el rol que tiene, como administrado, chofer o sistemas
        allowNull: false 
    },
    password: {
        type: DataTypes.STRING(100), // Define el tipo de dato como cadena de texto
        allowNull: false // No permite valores nulos
    },

})
    return User; // Retorna el modelo de usuario creado
}

module.exports = createUserModel; 