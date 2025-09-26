import React from 'react'
import NavbarChofer from '../../navbar/NavbarChofer'
import { useState, useEffect } from "react";
import axios from "axios";

const Incidencias = () => {
 const idUsuario = localStorage.getItem("id_usuario");
 const [incidencias, setIncidencias] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(idUsuario, "id del usuario en incidencias"); 

  useEffect(() => {
  const allIncidencias = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/incidencia/chofer/" + idUsuario);
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

console.log(incidencias, "incidencias del chofer"); 
  return (
    <div>
        <NavbarChofer />
        <h2>Registro de Incidencias del chofer</h2>
        </div>
  )
}

export default Incidencias