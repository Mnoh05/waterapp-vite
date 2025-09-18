const { SolicitudMaterial, SolicitudMaterialDetalles} = require('../config/db.js');

const createSolicitudMaterial = async (fecha, descripcion, solicitudId, detalles, moduloId) => {
  try {
    const newSolicitud = await SolicitudMaterial.create({
      fecha,
      descripcion,
      solicitudId,
      moduloId,
      detalles 
    }, {
      include: [{ model: SolicitudMaterialDetalles, as: "detalles" }] 
    });

    return newSolicitud;
  } catch (error) {
    console.error(error);
    throw new Error("Error al crear la solicitud de material");
  }
};


const allSolicitudes = async () => {
  try {
    console.log("Entrando a allSolicitudes en el handler");

    const solicitudes = await SolicitudMaterial.findAll({
      include: [{ model: SolicitudMaterialDetalles, as: "detalles" }]
    });

    return solicitudes;
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener las solicitudes de material');
  }
};

module.exports = {
  createSolicitudMaterial,
  allSolicitudes
};
