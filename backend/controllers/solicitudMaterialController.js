const{ userModel, solicitudMaterial, modulo } = require("../config/db");

const {
  createSolicitudMaterial,
  allSolicitudes
} = require("../handlers/solicitudMaterialHandler.js");

const createNewSolicitud = async (req, res) => {
  try {
    const { fecha, descripcion, solicitudId, detalles, moduloId } = req.body;
    console.log(req.body, "datos recibidos en el controlador");
    const newSolicitudMaterial = await createSolicitudMaterial(
      fecha,
      descripcion,
      solicitudId,
      detalles,
      moduloId
    );
    return res.status(200).json(newSolicitudMaterial);
  } catch (error) {
    return res
      .status(404)
      .json({ error: error.message, message: "Error al crear nueva solicitud" });
  }
};


const listAllSolicitudes = async (req, res) => {
  try {
    console.log("Entrando a listAllSolicitudes en el controlador");
    const allSolicitudesMaterial = await allSolicitudes();  
    return res.status(200).json(allSolicitudesMaterial);
  } catch (error) {
    return res.status(404).json({ error: error.message, message: "Error al listar las solicitudes" });
  }
};          


module.exports = {
  createNewSolicitud,
  listAllSolicitudes
};