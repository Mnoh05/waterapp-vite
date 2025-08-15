const { modulo } = require("../config/db.js");

const createModulo = async (nameModulo, latitud, longitud, chofer_id) => {
  nameModulo = nameModulo.toLowerCase();
  try {
    const newModulo = await modulo.create({
      nameModulo,
      latitud,
      longitud,
      chofer_id,
    });
    return newModulo;
  } catch (error) {
    return error.message;
  }
};

const allModulos = async () => {
  try {
    const allModulos = await modulo.findAll();
    return allModulos;
  } catch (error) {
    return error.message;
  }
};

const moduloById = async(id) => {
    try {
        const moduloId = await modulo.findByPk(id);
        return moduloId;
    } catch (error) {
        return error.message;
    }
}

module.exports = { createModulo, allModulos, moduloById };
