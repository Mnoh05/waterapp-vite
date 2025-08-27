const{incidencia, userModel, modulo} = require('../config/db.js');

const CreateIncident = async(description, modulo_id) =>{
    description = description.toLowerCase();

    const incident = await incidencia.create({description, modulo_id});
    
    return incident
}


const allIncidents = async() => {
    try {

        const incidents = await incidencia.findAll({
            include: [
            {
            model: modulo,
            as:'modulo',
            attributes: ['id', 'nameModulo', 'chofer_id'],
            include :[
                {
                    model: userModel,
                    as: 'chofer',
                    attributes: ['id', 'nameUser', 'lastNameUser', 'email']
                }
            ]
            }

        ],
         logging: console.log

    })
    console.log(incidents,"Aqui estoyyyyyy")
    return incidents;
        
    } catch (error) {
        return error.message;
    } 
}

const incidentsById = async (id) => { //incidencias por modulo

    const incidenciasxModul = await modulo.findByPk(id, {
        include: {
            model: incidencia,
            as: 'incidencias',
            attributes:['description', 'createdAt']
        }
    })
    
    return incidenciasxModul;
}


const incidentsByChofer = async (id) => {
    console.log(id, "Aqui estoyyyyyy entro en handler")

    const incidenciaxChofer = await incidencia.findAll({
        include:{
            model:modulo,
            as:'modulosI',
            where: {chofer_id:id},
            include:{
                model:userModel,
                as:'chofer',
                attributes:['nameUser', 'lastNameUser']
            }
        }
    })

    return incidenciaxChofer;
    
}
module.exports = {CreateIncident, allIncidents, incidentsById, incidentsByChofer};