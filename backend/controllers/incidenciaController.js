const{incidencia, userModel, modulo} = require('../config/db.js');
const{CreateIncident, allIncidents, incidentsById, incidentsByChofer} = require('../handlers/incidentHandler.js')


const createNewIncident = async(req, res) => {
    try {
        const {description, modulo_id} = req.body;
        const moduloF = await modulo.findByPk(modulo_id);
        if(!moduloF){
            return res.status(404).json({ error: "modulo no encontrado" });
        }

        const newIncident = await CreateIncident(description,modulo_id);
        return res.status(200).json(newIncident);


    } catch (error) {
       return res.status(404).json({ error: error.message, message: "Error al crear nuevo modulo" });
    }
}

const listAllIncidents = async (req, res) =>{
    try {
        
        const allIncident = await allIncidents();
        
        return res.status(200).json(allIncident);
        
    } catch (error) {
        return res.status(404).json({ message: "Error en el servidor" });
    }
}

const listByModulo = async(req, res) =>{
   const {id} = req.body;

  
   try { 
     
    const moduloP = await modulo.findByPk(id);
   
    if(!moduloP){
        return res.status(404).json({ error: "modulo no encontrado" });
    }

    const incidentM = await incidentsById(id);
    return res.status(200).json(incidentM);

   } catch (error) {
    return res.status(404).json({ message: "Error en el servidor" });
   }
}

const listByChofer = async(req, res) => {
    const choferId = parseInt(req.params.id);

    console.log(choferId, "id del chofer en incidencia controller");
    try {
        const chofer = await userModel.findByPk(choferId);

        if(!chofer){
            return res.status(404).json({ error: "Chofer no encontrado en la base de datos" });
        }
        const incidentC = await incidentsByChofer(choferId);
        return res.status(200).json(incidentC);

    } catch (error) {
        return res.status(404).json({ message: "Error en el servidor" });
    }

}

module.exports  = {createNewIncident, listAllIncidents, listByModulo, listByChofer};