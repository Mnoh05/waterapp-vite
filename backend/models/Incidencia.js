const {DataTypes} = require('sequelize');

const createIncidenciaModel = (sequelize) => {
const Incidencia = sequelize.define('Incidencia',{
    id:{
        type: DataTypes.INTEGER,// Define el tipo de dato como entero
        autoIncrement: true, // El ID se incrementa automáticamente
        primaryKey: true, // Define el ID como clave primaria
        unique: true 
    },
    description:{
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    modulo_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    }

})
    return Incidencia;
}

module.exports = createIncidenciaModel;