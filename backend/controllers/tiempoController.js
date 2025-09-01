const {userModel, modulo, tiempo} = require("../config/db");
const { createTiempo, allTiempos, tiempoById, editTiempoC } = require("../handlers/tiempoHandler.js");

const createNewTiempo = async (req, res) => {
    try {
        const {fecha, horaLlegada, horaSalida, id_moduloT, id_choferT} = req.body;

        const moduloExist = await modulo.findByPk(id_moduloT);
        if(!moduloExist){
            return res.status(404).json({error: "Modulo no encontrado"});
        }

        const newTiempo = await createTiempo(fecha, horaLlegada, horaSalida, id_moduloT, id_choferT);
        return res.status(200).json(newTiempo);
    } catch (error) {
        return res.status(404).json({error: error.message, message: "Error al crear nuevo tiempo"});
    }
}

const listAllTiempos = async (req, res) => {
    try {
        const tiempos = await allTiempos();
        return res.status(200).json(tiempos);
    } catch (error) {
        return res.status(404).json({error: error.message, message: "Error al listar los tiempos"});
    }
}

const findTiempoByID = async (req, res) => {
    try {
        const { id } = req.body;
        const tiempo = await tiempoById(id);
        if (!tiempo) {
            return res.status(404).json({ error: "Tiempo no encontrado" });
        }
        return res.status(200).json(tiempo);
    } catch (error) {
        return res.status(404).json({ error: error.message, message: "Error al buscar tiempo por ID" });
    }
}

const editTiempo = async (req, res) => {
    try {
        const { id, fecha, horaLlegada, horaSalida, id_moduloT, id_choferT } = req.body;
        const tiempo = await tiempoById(id);
        if (!tiempo) {
            return res.status(404).json({ error: "Tiempo no encontrado" });
        }
        const updatedTiempo = await editTiempoC(id, fecha, horaLlegada, horaSalida, id_moduloT, id_choferT);
        return res.status(200).json(updatedTiempo);
    } catch (error) {
        return res.status(404).json({ error: error.message, message: "Error al editar tiempo" });
    }
}
module.exports = {createNewTiempo, listAllTiempos, findTiempoByID, editTiempo};