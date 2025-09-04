import React, { use } from "react";
import NavbarChofer from "../navbar/NavbarChofer";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {obtenerHoyLocal} from '../dashboardChofer/utils/utils.js'
import axios from "axios";

const RegistroHorario = () => {
  const location = useLocation();
  const { modulo } = location.state || {};
  const hoy = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();

  //localStorage para persistencia de datos, y evitar que se borren los datos al recaragr
  const [registro, setRegistro] = useState(() => {
    const datosGuardados = localStorage.getItem("registro");
    return datosGuardados
      ? JSON.parse(datosGuardados)
      : {
          fecha: obtenerHoyLocal(),
          horaLlegada: "",
          horaSalida: "",
          id_moduloT: modulo.id,
          id_choferT: modulo.chofer.id,
        };
  });

  useEffect(() => {
    localStorage.setItem("registro", JSON.stringify(registro));
  }, [registro]);


  const obtenerHora = () => {
    const ahora = new Date();
    const horas = String(ahora.getHours()).padStart(2, "0");
    const minutos = String(ahora.getMinutes()).padStart(2, "0");
    return `${horas}:${minutos}`;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmar = window.confirm(
      "¿Estás seguro de que deseas crear este Registro?"
    );
    if (!confirmar) return;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/tiempos/crear-tiempo",
        registro
      );

      alert("Registro creado");
      setIsSaved(true);
      setRegistro({
        //limpia la informacion
        fecha: obtenerHoyLocal(),
        horaLlegada: "",
        horaSalida: "",
        id_moduloT: modulo.id,
        id_choferT: modulo.chofer.id,
      });
    } catch (error) {
        window.alert("Error al crear el registro, verifica los datos esten completos", error);
    }
  };
  console.log(registro, "modulo recibido en registro horario");
  const [isSaved, setIsSaved] = useState(false);

    // Advertir al usuario si intenta abandonar la página sin guardar
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (!isSaved) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isSaved]);

   // Limpi localStorage si el usuario abandona el componente
  useEffect(() => {
    return () => {
      if (!isSaved) {
        localStorage.removeItem("registro");
      }
    };
  }, [isSaved]);

    // Función para manejar la salida del componente
  const salir = () => {
    if (!isSaved) {
      const confirmar = window.confirm(
        "No has enviado los datos. ¿Seguro que quieres salir? Se eliminarán los datos."
      );
      if (!confirmar) return;
      localStorage.removeItem("registro"); // eliminr datos no enviados
    }
    console.log("Saliendo del componente");
    navigate("/home"); // Te lleva a la pagina principal
  };
  return (
    <div>
      <NavbarChofer />
      Registro de horario del módulo <h3>{modulo.nameModulo}</h3>
      <div className="container">
        <form onSubmit={handleSubmit}>
            <div className="row mb-3">
                <div>
                <label>Fecha:</label>
                <input type="date" value={registro.fecha || hoy} readOnly />
                </div>
            </div>
            <div className="row mb-3 d-flex align-items-center gap-2">
            <label className="col-3">Hora de Llegada:</label>
            <input type="time" className="col-3" value={registro.horaLlegada} readOnly />
            {!registro.horaLlegada && (
                <button
                type="button"
                className="btn btn-primary btn-sm col-3"
                data-bs-toggle="button"
                onClick={() => {
                    setRegistro({ ...registro, horaLlegada: obtenerHora() });
                }}
                >
                Registrar hora de llegada
                </button>
            )}
            </div>
            <div className="row mb-3 d-flex align-items-center gap-2">
            <label className="col-3">Hora de Salida:</label>
            <input type="time" className="col-3" value={registro.horaSalida} readOnly />
            { registro.horaLlegada && !registro.horaSalida && (
                <button
                type="button"
                className="btn btn-primary btn-sm col-3"
                data-bs-toggle="button"
                onClick={() => {
                    setRegistro({ ...registro, horaSalida: obtenerHora() });
                }}
                >
                Registrar hora de salida
                </button>
            )}
            </div>
            <div className="row mb-3 d-flex align-items-center gap-2">
                <div className="col-3"></div>
                <button type="submit" className="btn btn-success col-3">Registrar</button>
                <button type="button" className="btn btn-danger col-3" onClick={salir}> Salir</button>
                <div className="col-3"></div>
            </div>
        </form>
      </div>
    </div>
  );
};

export default RegistroHorario;
