const { DataTypes } = require('sequelize');

const createSolicitudMaterialDetalleModel = (sequelize) => {
  const SolicitudMaterialDetalle = sequelize.define('SolicitudMaterialDetalle', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    cantidad: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    solicitudId: {
      type: DataTypes.INTEGER,
      allowNull: false
      // No necesitas definir `references` si ya haces la asociación en `bd.js`
    }
  });

  return SolicitudMaterialDetalle;
};

module.exports = createSolicitudMaterialDetalleModel;