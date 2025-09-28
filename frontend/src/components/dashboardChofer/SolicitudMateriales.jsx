import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import NavbarChofer from "../navbar/NavbarChofer";
import { obtenerHoyLocal } from "../dashboardChofer/utils/utils.js";
import "../css/home.css";

const SolicitudMateriales = () => {
  const location = useLocation();
  const { modulo } = location.state || {};

  const [formulario, setFormulario] = useState(() => {
    const datosGuardados = localStorage.getItem("registro");
    console.log(modulo, "modulo en registro de incidencia");
    return datosGuardados
      ? JSON.parse(datosGuardados)
      : {
          fecha: obtenerHoyLocal(),
          descripcion:
            "Solicitud de materiales para el módulo " + modulo.nameModulo,
          moduloId: modulo.id,
          detalles: [],
        };
  });

  const agregarDetalle = () => {
    setFormulario((prev) => ({
      ...prev,
      detalles: [...prev.detalles, { nombre: "", cantidad: "" }],
    }));
  };

  const actualizarDetalle = (index, campo, valor) => {
    const nuevosDetalles = [...formulario.detalles];
    nuevosDetalles[index][campo] = valor;
    setFormulario((prev) => ({ ...prev, detalles: nuevosDetalles }));
  };

  const handleSubmit = async (e) => {
    //accion que envia la informacion a mi api para crear el modulo
    e.preventDefault();
    const confirmar = window.confirm(
      "¿Estás seguro de que deseas crear esta solicitud?"
    );
    if (!confirmar) return;
    console.log(formulario, "formulario de solicitud de materiales");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/solicitudMaterial/crear-solicitud",
        formulario
      );

      console.log(response.data, "respuesta de crear incidencia");

      alert("Solicitud creada");
      setFormulario({
        //limpia la informacion
        fecha: obtenerHoyLocal(),
        descripcion:
          "Solicitud de materiales para el módulo " + modulo.nameModulo,
        moduloId: modulo.id,
        detalles: [],
      });
    } catch (error) {
      console.error("Error al crear la solicitud:", error);
    }
  };

    const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigate("/admin/dashboard");
    }
  };

  return (
    <div>
      <NavbarChofer />
      <div className="contenedor mt-4">
        <div className="row p-2">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="text-center">
              <h2 className="text">Solicitud de materiales para el módulo {modulo.nameModulo}</h2>
            </div>
          </div>
          <div className="col-md-2 d-flex justify-content-end justify-content-lg-start align-items-center">
            <button
              className="btn-chico-azul"
              style={{ border: "none", color: "white" }}
              onClick={handleBack}
            >
              ← Regresar
            </button>
          </div>
        </div>

        <div className="card shadow-sm p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <div>
                <label>Fecha:</label>
                <input type="date" value={formulario.fecha || hoy} readOnly />
              </div>
            </div>
            <h5>Materiales y cantidad</h5>
            {formulario.detalles.map((detalle, index) => (
              <div key={index} className="mb-3">
                <input
                  type="text"
                  required
                  placeholder="Cantidad"
                  value={detalle.cantidad}
                  onChange={(e) =>
                    actualizarDetalle(index, "cantidad", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Nombre"
                  required
                  value={detalle.nombre}
                  onChange={(e) =>
                    actualizarDetalle(index, "nombre", e.target.value)
                  }
                />
              </div>
            ))}

            <div className="d-flex justify-content-center mb-2">
              <button
                type="button"
                onClick={agregarDetalle}
                className="btn-chico-azul"
                style={{ color: "white" }}
              >
                + Agregar producto
              </button>
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

export default SolicitudMateriales;
