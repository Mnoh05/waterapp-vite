const { modulo, userModel, tiempo } = require("../config/db.js");

const createModulo = async (nameModulo, latitud, longitud, chofer_id) => {
  nameModulo = nameModulo.toLowerCase();

      const newModulo = await modulo.create({
      nameModulo,
      latitud,
      longitud,
      chofer_id,
    });

     return newModulo;
};

const allModulos = async () => {
  try {
    const allModulos = await modulo.findAll({
      include: [
      {
        model: userModel,
        as:'chofer',
        attributes: ['id','user','nameUser', 'lastNameUser', 'email']
      },
      {
        model: tiempo,
        as: 'tiempos',
        attributes: ['id', 'fecha', 'horaLlegada', 'horaSalida'],
      }
    ]
  });
    return allModulos;
  } catch (error) {
    return error.message;
  }
};

const moduloById = async(id) => {
  
        const moduloId = await modulo.findByPk(id,{
          include : {
            model:userModel,
            as:'chofer',
            attributes:['user', 'nameUser', 'email']
          }
        });
        
        return moduloId;

}

const editModuloC = async(id, chofer_id, newChofer) => {
  
  const  moduloId = await moduloById(id);
  if(!moduloId ) {
    return res.status(404).json({message:"Modulo no encontrado"});
  }

  const choferId = await userModel.findByPk(chofer_id);
  if(!choferId) {
    return res.status(404).json({message:"No existe chofer"});
  }

    const newChoferI = await userModel.findByPk(newChofer);
  if(!newChoferI) {
    return res.status(404).json({message:"No existe chofer"});
  }

  try {
    //update solo devuelve los campos actualizados, no devuelve el modelo ya cambiado
    const updateChofer = await modulo.update({chofer_id: newChofer}, {where: {id:id }});
    if(updateChofer === 0){
      throw new Error("No se encontro el modulo, no se actualizo")
    }
    const moduloUpdate = await modulo.findByPk(id, {
      include:{
        model:userModel,
        as:'chofer',
        attributes:['user', 'nameUser']
      }
    })
    return moduloUpdate;
    
  } catch (error) {
    return error.message;
  }
}

module.exports = { createModulo, allModulos, moduloById, editModuloC };
