import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../../navbar/Navbar.jsx";
import { useAuth } from "../../hooks/authContext.jsx";
import { Link } from "react-router-dom";
import "../../css/home.css";

const AddChofer = () => {
  const { listaChoferes } = useAuth();
  const [formulario, setFormulario] = useState({
    user: "",
    nameUser: "",
    lastNameUser: "",
    email: "",
    rol_id: "4",
    password: "admin",
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
    const { user, nameUser, lastNameUser, email } = formulario;
    if (!user || !nameUser || !lastNameUser || !email) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    const confirmar = window.confirm(
      "¿Estás seguro de que deseas crear este usuario?"
    );
    if (!confirmar) return;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/login/crear-usuario",
        formulario
      );

      alert("Usuario creado");
      setFormulario({
        //limpia la informacion
        user: "",
        nameUser: "",
        lastNameUser: "",
        email: "",
        rol_id: "4",
        password: "admin",
      });
      listaChoferes();
    } catch (error) {
      console.error("Error al crear el usuario:", error);
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
              <h2 className="text">Agregar Chofer</h2>
            </div>
          </div>
          <div className="col-md-4">
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
              <div className="mb-3 text-start">
                <label htmlFor="nameUser" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="nameUser"
                  id="nameUser"
                  value={formulario.nameUser}
                  onChange={handleChangeFormulario}
                />
              </div>

              <div className="mb-3 text-start">
                <label htmlFor="lastNameUser" className="form-label">
                  Apellido
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="lastNameUser"
                  id="lastNameUser"
                  value={formulario.lastNameUser}
                  onChange={handleChangeFormulario}
                />
              </div>
              <div className="mb-3 text-start">
                <label htmlFor="user" className="form-label">
                  Usuario
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="user"
                  id="user"
                  value={formulario.user}
                  onChange={handleChangeFormulario}
                />
              </div>
              <div className="mb-3 text-start">
                <label htmlFor="email" className="form-label">
                  Correo
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  id="email"
                  value={formulario.email}
                  onChange={handleChangeFormulario}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Agregar
              </button>
            </form>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </div>
  );
};

export default AddChofer;
