const { userModel, tiempo, modulo } = require("../config/db");

const createTiempo = async (
  fecha,
  horaLlegada,
  horaSalida,
  id_moduloT,
  id_choferT
) => {
  console.log(
    fecha,
    horaLlegada,
    horaSalida,
    id_moduloT,
    id_choferT,
    "desde el back"
  );
  horaSalida = horaSalida && horaSalida.trim() !== "" ? horaSalida : null;

  try {
    const newTiempo = await tiempo.create({
      fecha,
      horaLlegada,
      horaSalida: horaSalida && horaSalida.trim() !== "" ? horaSalida : null,
      id_moduloT,
      id_choferT,
    });
    return newTiempo;
  } catch (error) {
    throw new Error("Error al crear tiempo", error.message);
  }
};

const allTiempos = async () => {
  try {
    const tiempos = await tiempo.findAll();
    return tiempos;
  } catch (error) {
    throw new Error("Error al obtener todos los tiempos");
  }
};

const tiempoById = async (id) => {
  try {
    const tiempo = await tiempo.findByPk(id);
    return tiempo;
  } catch (error) {
    throw new Error("Error al obtener tiempo por ID");
  }
};

const editTiempoC = async (
  id,
  fecha,
  horaLlegada,
  horaSalida,
  id_moduloT,
  id_choferT
) => {
  try {
    const tiempo = await tiempo.findByPk(id);
    if (!tiempo) {
      throw new Error("Tiempo no encontrado");
    }
    tiempo.fecha = fecha;
    tiempo.horaLlegada = horaLlegada;
    tiempo.horaSalida = horaSalida;
    tiempo.id_moduloT = id_moduloT;
    tiempo.id_choferT = id_choferT;
    await tiempo.save();
    return tiempo;
  } catch (error) {
    throw new Error("Error al editar tiempo");
  }
};

const filtrarTiempos = async (fecha, id_moduloT) => {
  console.log("Filtrando tiempos por fecha y módulo:", fecha, id_moduloT);
  try {
    const tiempos = await tiempo.findAll({
      where: {
        fecha: fecha,
        id_moduloT: id_moduloT,
      },
    });
    return tiempos;
  } catch (error) {
    throw new Error("Error al filtrar tiempos");
  }
};

const editTiempoCId = async (fecha, horaSalida, id_moduloT) => {

    console.log(fecha, horaSalida, id_moduloT, "datos recibidos en el handler para editar hora de salida");
  try {
    const [actualizados] = await tiempo.update(
      { horaSalida },
      {
        where: {
          id_moduloT,
          fecha,
        },
      }
    );

    if (actualizados === 0) {
      return res.status(404).send("No se encontró ningún registro que coincida");
    }

    res.status(200).send("Hora de salida actualizada correctamente");
  } catch (error) {
    console.error("Error al actualizar horaSalida:", error);
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = {
  createTiempo,
  allTiempos,
  tiempoById,
  editTiempoC,
  filtrarTiempos,
  editTiempoCId,
};
