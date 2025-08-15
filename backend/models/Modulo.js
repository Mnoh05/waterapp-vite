const {DataTypes, DECIMAL} = require ('sequelize');

const createModuloModel = (sequelize) =>{
    const Modulo  = sequelize.define('Modulo', {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique:true
        },
        nameModulo:{
            type:DataTypes.STRING(50),
            allowNull:false
        },
        latitud: {
            type:DataTypes.DECIMAL(10,8),
            allowNull: false
        },
        longitud:{
            type:DataTypes.DECIMAL(10,8),
            allowNull:false
        },
        chofer_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
        
    })
    return Modulo;

}

module.exports = createModuloModel;