const {DataTypes} = require('sequelize');
const { modulo } = require('../config/db');

const createSolicitudMaterialModel = (sequelize) => {
const SolicitudMaterial = sequelize.define('SolicitudMaterial',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true, // Define el tipo de dato como entero
        primaryKey: true
    },
    fecha:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    descripcion:{
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    moduloId:{
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});


return SolicitudMaterial;
};

module.exports = createSolicitudMaterialModel;