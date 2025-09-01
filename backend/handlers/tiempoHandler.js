const {userModel, tiempo, modulo} = require('../config/db');

const createTiempo = async (fecha, horaLlegada, horaSalida, id_moduloT, id_choferT) => {
    try {
        const newTiempo = await tiempo.create({
            fecha,
            horaLlegada,
            horaSalida,
            id_moduloT,
            id_choferT
        });
        return newTiempo;
    } catch (error) {
        throw new Error("Error al crear tiempo");
    }
}

const allTiempos = async () => {
    try {
        const tiempos = await tiempo.findAll();
        return tiempos;
    } catch (error) {
        throw new Error("Error al obtener todos los tiempos");
    }
}

const tiempoById = async (id) => {
    try {
        const tiempo = await tiempo.findByPk(id);
        return tiempo;
    } catch (error) {
        throw new Error("Error al obtener tiempo por ID");
    }
}

const editTiempoC = async (id, fecha, horaLlegada, horaSalida, id_moduloT, id_choferT) => {
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
}

module.exports = { createTiempo, allTiempos, tiempoById, editTiempoC };
