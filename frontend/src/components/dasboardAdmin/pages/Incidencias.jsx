import React from "react";
import Navbar from "../../navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from 'dayjs';
import FilterIncidencias from "../../hooks/FilterIncidencias";


const Incidencias = () => {
  const [incidencias, setIncidencias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchItem, setSearchItem] = useState('');


useEffect(() => {
  const allIncidencias = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/incidencia");
      console.log("Datos recibidos:", response.data);
      setIncidencias(response.data);
      
    } catch (error) {
      console.error(
        "Error al obtener incidencias:",
        error.response?.data?.message || error.message
      );
    } finally { //siempre se ejecuta haya o no error
      setLoading(false);
    }
  };
  console.log(incidencias.data)
  allIncidencias();
}, []);

const handleSearch = (valor) => {
   console.log("Valor recibido desde Navbar:", valor);

  setSearchItem(valor);
}


  const hayIncidencias = Array.isArray(incidencias) && incidencias.length > 0; //para evitar el valor null del array
  return (
    <div>
      <Navbar onSearch={handleSearch}/>
      <FilterIncidencias searchItem={searchItem} incidencias={incidencias} />

      {/* <div className="container pt 4">
        <p className="fs-2">Soy de Prueba en incidencias</p>
        {loading ? (
          <p>Cargando...</p>
        ) : hayIncidencias ? (
          <ul className="list-group list-group-numbered">
            {incidencias.map((item) => (
              <li  className="list-group-item" key={item.id}> Modulo: {item.modulosI?.nameModulo} ----- {item.description}  ----- Fecha {item.updatedAt}</li>
            ))}
          </ul>
        ) : (
          <p>No hay incidencias registradas.</p>
        )}
        
      </div> */}
      <div className="container pt 4">
        <p className="fs-2"> Incidencias</p>
        {
            loading ? (
                <p>CArgandoo....</p>
            ) : hayIncidencias ? (
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                          
                          <th>Id Incidencia</th>
                          <th>Módulo</th>
                          <th>Chofer</th>
                          <th>Descripcion</th>
                          <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        { incidencias.map((item, index)=> (
                            <tr key={item.id}>
                                <td>{index  + 1}</td>
                                <td>{item.modulo?.nameModulo}</td>
                                <td>{item.modulo?.chofer.nameUser + ' ' + item.modulo?.chofer.lastNameUser} </td>
                                <td>{item.description}</td>
                                {/* <td>{item.updatedAt}</td> */}
                                <td>{dayjs(item.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</td>
                            </tr>
                        ))

                        }
                    </tbody>
                </table>
            ) : (
          <p>No hay incidencias registradas.</p>
        )
        }

      </div>
    </div>
  );
};

export default Incidencias;
