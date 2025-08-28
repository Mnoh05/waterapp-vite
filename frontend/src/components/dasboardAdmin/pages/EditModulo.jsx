import React from "react";
import Navbar from "../../navbar/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/authContext.jsx";

const EditModulo = () => {
  const { choferes, modulos, listaModulos } = useAuth();
  const [moduloSet, setModuloSet] = useState(""); //guarda elnombre del chofer del modulo seleccionado

  const [formulari, setFormulari] = useState({
    //info que se envia para editar el modulo
    id: "",
    chofer_id: "",
    newChofer: "",
  });

  const handleChangeFormulario = (e) => {
    const { name, value } = e.target;

    setFormulari((prev) => ({ ...prev, [name]: value })); //guarda el id del modulo

    const moduloSeleccionado = modulos.find(
      (mod) => mod.id === parseInt(value)
    );
    const nombreChofer =
      moduloSeleccionado?.chofer?.nameUser || "Sin chofer asignado";

    setFormulari((prev) => ({
      ...prev,
      chofer_id: moduloSeleccionado?.chofer?.id || "", //guatda el id del chofer actual
    }));

    setModuloSet(nombreChofer);
  };

  const handleSetNewChofer = (e) => {
    const { name, value } = e.target;

    setFormulari((prev) => ({ ...prev, [name]: value })); //guarda el id del nuevo chofer
  };


  const handleSubmit = async (e) => {
    //accion que envia la informacion a mi api para editar el modulo
    e.preventDefault();
    const confirmar = window.confirm(
      "¿Estás seguro de que deseas editar este módulo?"
    );
    if (!confirmar) return;

    try {
      const response = await axios.put(
        "http://localhost:3000/api/modulos/editar-modulo",
        formulari
      );

      alert("Módulo editado");
      setFormulari({
        //limpia la informacion
        id: "",
        chofer_id: "",
        newChofer: "",
      });

      setModuloSet("");
      await listaModulos(); //llama la consulta para renderizar la lista de los modulos, con la info actrualizada
    } catch (error) {
      const mensaje = error.response?.data?.message || "Error inesperado";
      console.error("Mensaje del backend:", mensaje);
      alert(mensaje);
    }
  };

  return (
    <div>
      <div className="container pt 4">
        <Navbar />
        <h2>Editar Módulo</h2>
        <form onSubmit={handleSubmit}>
          {modulos.length > 0 && (
            <div className="mb-3">
              <label htmlFor="id" className="form-label">
                Seleccione el Modulo
              </label>
              <select
                id="id"
                name="id"
                className="form-select"
                value={formulari.id}
                onChange={handleChangeFormulario}
              >
                <option disabled value="">
                  Selecciona el módulo
                </option>
                {modulos.map((modulo) => (
                  <option key={modulo.id} value={modulo.id}>
                    {modulo.nameModulo}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="latitud" className="form-label">
              Chofer Asignado
            </label>
            <input
              type="text"
              value={moduloSet || ""}
              readOnly
              placeholder="Chofer asignado"
            />
          </div>

          {choferes.length > 0 && (
            <div className="mb-3">
              <label htmlFor="newChofer" className="form-label">
                Seleccione Nuevo Chofer
              </label>
              <select
                id="newChofer"
                name="newChofer"
                className="form-select"
                value={formulari.newChofer}
                onChange={handleSetNewChofer}
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
            Editar Modulo
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModulo;
