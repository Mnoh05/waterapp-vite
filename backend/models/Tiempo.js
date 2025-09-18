const { DataTypes } = require('sequelize'); // Importa DataTypes de Sequelize
const sequelize = require('../config/db'); 

const createTiempo = (sequelize) => { 
    const Tiempo = sequelize.define('Tiempo', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        fecha: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        horaLlegada: {
            type: DataTypes.TIME,
            allowNull: false
        },
        horaSalida: {
            type: DataTypes.TIME,
            allowNull: true
        },
        id_moduloT: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_choferT: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        indexes: [
            {
                unique: false,
                fields: ['fecha', 'id_moduloT'] // 👈 combinación única
            }
        ]
    });

    return Tiempo;
}

module.exports = createTiempo;
