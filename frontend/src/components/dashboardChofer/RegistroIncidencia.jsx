import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import NavbarChofer from "../navbar/NavbarChofer";
import { obtenerHoyLocal } from "../dashboardChofer/utils/utils.js";

const RegistroIncidencia = () => {
  const location = useLocation();
  const { modulo } = location.state || {};
  const [formulario, setFormulario] = useState(() => {
    const datosGuardados = localStorage.getItem("registro");
    return datosGuardados
      ? JSON.parse(datosGuardados)
      : {
          description: "",
          modulo_id: modulo.id,
        };
  });
  console.log(formulario, "desde registro de incidencia");

  return (
    <div>
      <NavbarChofer />
      Registro de Incidencia del módulo <h3> {modulo.nameModulo}</h3>
      <div className="container">
        <form>
          <div className="row mb-3">
            <div>
              <label>Descripcion de la incidencia</label>
              <textarea
                value={formulario.description}
                onChange={(e) =>
                  setFormulario({ ...formulario, description: e.target.value })
                }
                rows="4"
                cols="50"
                placeholder="Escribe aquí la descripcion de la incidencia..."
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistroIncidencia;
