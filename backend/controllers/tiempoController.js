const { userModel, modulo, tiempo } = require("../config/db");
const {
  createTiempo,
  allTiempos,
  tiempoById,
  editTiempoC,
  filtrarTiempos,
  editTiempoCId,
} = require("../handlers/tiempoHandler.js");

const createNewTiempo = async (req, res) => {
  try {
    const { fecha, horaLlegada, horaSalida, id_moduloT, id_choferT } = req.body;
    console.log(req.body, "datos recibidos en el controlador");

    const moduloExist = await modulo.findByPk(id_moduloT);
    if (!moduloExist) {
      return res.status(404).json({ error: "Modulo no encontrado" });
    }

    const newTiempo = await createTiempo(
      fecha,
      horaLlegada,
      horaSalida,
      id_moduloT,
      id_choferT
    );
    return res.status(200).json(newTiempo);
  } catch (error) {
    return res
      .status(404)
      .json({ error: error.message, message: "Error al crear nuevo tiempo" });
  }
};

const listAllTiempos = async (req, res) => {
  try {
    const tiempos = await allTiempos();
    return res.status(200).json(tiempos);
  } catch (error) {
    return res
      .status(404)
      .json({ error: error.message, message: "Error al listar los tiempos" });
  }
};

const findTiempoByID = async (req, res) => {
  try {
    const { id } = req.body;
    const tiempo = await tiempoById(id);
    if (!tiempo) {
      return res.status(404).json({ error: "Tiempo no encontrado" });
    }
    return res.status(200).json(tiempo);
  } catch (error) {
    return res
      .status(404)
      .json({ error: error.message, message: "Error al buscar tiempo por ID" });
  }
};

const editTiempo = async (req, res) => {
  try {
    const { id, fecha, horaLlegada, horaSalida, id_moduloT, id_choferT } =
      req.body;
    const tiempo = await tiempoById(id);
    if (!tiempo) {
      return res.status(404).json({ error: "Tiempo no encontrado" });
    }
    const updatedTiempo = await editTiempoC(
      id,
      fecha,
      horaLlegada,
      horaSalida,
      id_moduloT,
      id_choferT
    );
    return res.status(200).json(updatedTiempo);
  } catch (error) {
    return res
      .status(404)
      .json({ error: error.message, message: "Error al editar tiempo" });
  }
};

const filtradoTiempos = async (req, res) => {
  try {
    const { fecha, id_moduloT } = req.query;
    console.log(fecha, id_moduloT, "query params en el controlador");
    const tiempos = await filtrarTiempos(fecha, id_moduloT);
    return res.status(200).json(tiempos);
  } catch (error) {
    return res
      .status(404)
      .json({ error: error.message, message: "Error al filtrar tiempos" });
  }
};

const editIdTiempo = async (req, res) => {
  try {
   const { id } = req.params;   // 👈 id_moduloT
  const { fecha } = req.query; // 👈 fecha
  const { horaSalida } = req.body;
    console.log(
      id,
      fecha,
      horaSalida,
      "datos recibidos en el controlador para editar hora de salida"
    );

    const registro = await tiempo.findOne({
      where: {
        fecha: fecha,
        id_moduloT: id,
      },
    });

    console.log(
      registro,
      "tiempo encontrado en el controlador para editar hora de salida"
    );
    if (!registro) {
      return res.status(404).json({ error: "Tiempo no encontrado" });
    }
    const updatedTiempo = await editTiempoCId(fecha, horaSalida, id);
    return res.status(200).json(updatedTiempo);
  } catch (error) {
    return res
      .status(404)
      .json({ error: error.message, message: "Error al editar tiempo" });
  }
};

module.exports = {
  createNewTiempo,
  listAllTiempos,
  findTiempoByID,
  editTiempo,
  filtradoTiempos,
  editIdTiempo,
};
