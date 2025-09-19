import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Navbar from "../../navbar/Navbar.jsx";
import FilterSolicitudes from "../../hooks/FilterSolicitudes";

const SolicitudMateriales = () => {
  const [materiales, setMateriales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchItem, setSearchItem] = useState('');

  useEffect(() => {
    const allSolicitudes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/solicitudMaterial"
        );
        setMateriales(response.data);
        
      } catch (error) {
        console.error(
          "Error al obtener solicitudes:",
          error.response?.data?.message || error.message
        );
      } finally {
        //siempre se ejecuta haya o no error
        setLoading(false);
      }
    };
    allSolicitudes();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  const handleAll = () => {
  setSearchItem(null);
  <FilterSolicitudes searchItem={searchItem} solicitudes={materiales} />
}

const handleSearch = (valor) => {
  setSearchItem(valor);
}
const hayMateriales = Array.isArray(materiales) && materiales.length > 0;

  return <div>
    <Navbar onSearch={handleSearch}/>
    SolicitudMateriales
    <button  onClick={handleAll}>Todas las solicitudes</button>
    <p className="fs-2"> Solicitudes de materiales</p>
    <FilterSolicitudes searchItem={searchItem} solicitudes={materiales} />
    </div>;
};

export default SolicitudMateriales;
