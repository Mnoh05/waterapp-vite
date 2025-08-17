const { userModel, modulo } = require("../config/db.js");
const {
  createModulo,
  allModulos,
  moduloById,
  editModuloC,
} = require("../handlers/moduloHandler.js");
//Crear nuevos modulos
const createNewModulo = async (req, res) => {
  try {
    const { nameModulo, latitud, longitud, chofer_id } = req.body;
    const chofer = await userModel.findByPk(chofer_id);

    if (!chofer) {
      return res.status(404).json({ error: "Chofer no encontrado" });
    }

    const newModulo = await createModulo(
      nameModulo,
      latitud,
      longitud,
      chofer_id
    );
    return res.status(200).json(newModulo);
  } catch (error) {
    return res
      .status(404)
      .json({ error: error.message, message: "Error al crear nuevo modulo" });
  }
};

//Listar los modulos con sus choferes asignados
const listAllModulos = async (req, res) => {
  try {
    const allModulo = await allModulos();
    return res.status(200).json(allModulo);
  } catch (error) {
    return res.status(404).json({ message: "Error en el servidor" });
  }
};

const findModuloByID = async (req, res) => {
  const { id } = req.body;

  if (!id || isNaN(id)) {
    //valida que el id que se ingrese sea un valor valido
    return res.status(404).json({ message: "Modulo no encontrado" });
  }
  try {
    const moduloId = await moduloById(id);

    if (!moduloId) {
      return res.status(404).json({ message: "No se encontro el modulo" });
    }

    return res.status(200).json(moduloId);

  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, message: "Fallo inesperado" });
  }
};

//funcion para cambiar al chofer del modulo
const editModulo = async (req, res) => {
  const { id, chofer_id, newChofer } = req.body;

  if (!id || isNaN(id)) {
    //valida que el id que se ingrese sea un valor valido
    return res.status(404).json({ message: "Modulo no encontrado" });
  }
  if (!chofer_id || isNaN(chofer_id)) {
    //valida que el id que se ingrese sea un valor valido
    return res.status(404).json({ message: "Chofer no encontrado" });
  }

    if (!newChofer || isNaN(newChofer)) {
    //valida que el id que se ingrese sea un valor valido
    return res.status(404).json({ message: "Chofer nuevo no es válido" });
  }

  try {
    const editModuloChofer = await editModuloC(id, chofer_id, newChofer);
    return res.status(200).json(editModuloChofer);
  } catch (error) {
    return res.status(404).json({ message: "Modulo o chofer no encontrado" });
  }
};

module.exports = {
  createNewModulo,
  listAllModulos,
  findModuloByID,
  editModulo,
};
