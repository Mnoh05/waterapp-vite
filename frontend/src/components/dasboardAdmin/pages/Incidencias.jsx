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
  allIncidencias();
}, []);

const handleSearch = (valor) => {
  setSearchItem(valor);
}

const handleAll = () => {
  setSearchItem(null);
  <FilterIncidencias searchItem={searchItem} incidencias={incidencias} />
}


  const hayIncidencias = Array.isArray(incidencias) && incidencias.length > 0; //para evitar el valor null del array
  return (
    <div>
      <Navbar onSearch={handleSearch}/>
      <button  onClick={handleAll}>Todas las incidencias</button>
      <p className="fs-2"> Incidencias</p>
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
    </div>
  );
};

export default Incidencias;
