const {DataTypes} = require ('sequelize'); // Importa DataTypes de Sequelize para definir los tipos de datos del modelo
const sequelize = require('../config/db'); 

const createTiempo = (sequelize) => { 
    const Tiempo = sequelize.define('Tiempo',{
        id: {
        type: DataTypes.INTEGER,// Define el tipo de dato como entero
        autoIncrement: true, // El ID se incrementa automáticamente
        primaryKey: true, // Define el ID como clave primaria
        unique: true
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    horaLlegada: {
        type: DataTypes.TIME,
        allowNull: false
    },
    horaSalida: {
        type: DataTypes.TIME,
        allowNull: false
    },
    id_moduloT: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_choferT: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    })

    return Tiempo;
}

module.exports = createTiempo;