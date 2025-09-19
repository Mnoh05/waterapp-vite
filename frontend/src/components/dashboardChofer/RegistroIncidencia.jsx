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
    console.log(modulo, "modulo en registro de incidencia");
    return datosGuardados
      ? JSON.parse(datosGuardados)
      : {
          description: "",
          modulo_id: modulo.id,
        };
  });
  console.log(formulario, "desde registro de incidencia");

  const handleSubmit = async (e) => {
    //accion que envia la informacion a mi api para crear el modulo
    e.preventDefault();
    const confirmar = window.confirm(
      "¿Estás seguro de que deseas crear esta incidencia?"
    );
    if (!confirmar) return;

    if (!formulario.description.trim()) {
      alert("La descripción no puede estar vacía.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/incidencia/nuevo",
        formulario
      );
      alert("Incidencia creada");
      setFormulario({
        //limpia la informacion
        description: "",
        modulo_id: modulo.id,
      });
    } catch (error) {
      console.error("Error al crear la incidencia:", error);
    }
  };

  return (
    <div>
      <NavbarChofer />
      <div className="container mt-4">
        <div className="card shadow-sm p-4">
          <h4 className="mb-4">Registrar incidencia del módulo<h3> {modulo.nameModulo}</h3></h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="description" className="form-label fw-bold">
                Descripción de la incidencia
              </label>
              <textarea
                id="description"
                className="form-control"
                value={formulario.description}
                onChange={(e) =>
                  setFormulario({ ...formulario, description: e.target.value })
                }
                rows="5"
                placeholder="Describe la incidencia detalladamente..."
                required
              />
            </div>

            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary">
                Crear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistroIncidencia;
