import React from "react";
import Navbar from "../../navbar/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/authContext.jsx";
import { Link } from "react-router-dom";
import "../../css/home.css";

const AddModulo = () => {
  const { choferes } = useAuth();

  const [formulario, setFormulario] = useState({
    nameModulo: "",
    latitud: "",
    longitud: "",
    chofer_id: "",
  });

  const handleChangeFormulario = (e) => {
    //accion para poder almacenar la informacion de los inputs en el estado de formulario para crear el nuevo modulo
    const { name, value } = e.target;

    setFormulario((prev) => ({ ...prev, [name]: value }));
    console.log(formulario);
  };

  const handleSubmit = async (e) => {
    //accion que envia la informacion a mi api para crear el modulo
    e.preventDefault();
    if (!nameModulo || !latitud || !longitud || !chofer_id) {
      alert("Por favor completa todos los campos antes de continuar.");
      return;
    }

    const confirmar = window.confirm(
      "¿Estás seguro de que deseas crear este módulo?"
    );
    if (!confirmar) return;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/modulos/crear-modulo",
        formulario
      );

      alert("Módulo creado");
      setFormulario({
        //limpia la informacion
        nameModulo: "",
        latitud: "",
        longitud: "",
        chofer_id: "",
      });
    } catch (error) {
      console.error("Error al crear módulo:", error);
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
      <Navbar />
      <div className="contenedor pt 4">
        <div className="row p-2">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div className="text-center">
              <h2 className="text">Agregar Módulo</h2>
            </div>
          </div>
          <div className="col-md-3 d-flex justify-content-end justify-content-lg-start align-items-center">
            <button
              className="btn-chico-azul"
              style={{ border: "none", color: "white" }}
              onClick={handleBack}
            >
              ← Regresar
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <form onSubmit={handleSubmit} className="card-translucida">
              <div className="mb-3">
                <label htmlFor="nameModulo" className="form-label">
                  Nombre del Módulo
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="nameModulo"
                  id="nameModulo"
                  required
                  value={formulario.nameModulo}
                  onChange={handleChangeFormulario}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="latitud" className="form-label">
                  Latitud
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="latitud"
                  id="latitud"
                  required
                  value={formulario.latitud}
                  onChange={handleChangeFormulario}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="longitud" className="form-label">
                  Longitud
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="longitud"
                  id="longitud"
                  required
                  value={formulario.longitud}
                  onChange={handleChangeFormulario}
                />
              </div>

              {choferes.length > 0 && (
                <div className="mb-3">
                  <label htmlFor="chofer_id" className="form-label">
                    Chofer
                  </label>
                  <select
                    id="chofer_id"
                    required
                    name="chofer_id"
                    className="form-select"
                    value={formulario.chofer_id}
                    onChange={handleChangeFormulario}
                  >
                    <option disabled value="">
                      Selecciona un chofer
                    </option>
                    {choferes.map((chofer) => (
                      <option key={chofer.id} value={chofer.id}>
                        {chofer.nameUser}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <button type="submit" className="btn btn-primary">
                Crear Módulo
              </button>
            </form>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </div>
  );
};

export default AddModulo;
