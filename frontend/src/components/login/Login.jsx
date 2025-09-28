import React from "react";
import logo from "../../assets/login/login3.png";
import "./Login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/authContext";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      //Api del back para los usuarios
      const response = await axios.post("http://localhost:3000/api/login", {
        user: username,
        password: password,
      });

      console.log(response, "Respuesta del servidor");

      const { token, id, role } = response.data; //extrae info de la

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("id_usuario", response.data.id);
      localStorage.setItem("rol_id", response.data.role);
      localStorage.setItem("nombre", response.data.nombre);
      localStorage.setItem("apellido", response.data.apellido);

      setUser({
        id: response.data.id,
        role: response.data.role,
        nombre: response.data.nombre,
        apellido: response.data.apellido,
      });

      setMensaje("Bienvenido " + username);

      if (id === 1 || id === 5) {
        navigate("/admin/home");
      } else {
        navigate("/home");
      }
    } catch (error) {
      if (error.response) {
        const mensaje = error.response.data.message;
        setMensaje(mensaje);
      } else {
        console.log("Error inesperado:", error.message);
      }
    }
  };

  return (
    <div className="body-login" style={{padding: "1.5rem"}}>
      <div className="container d-flex justify-content-center align-items-center">
        <div className="card mb-3 custom-card" style={{ padding: "1em" }}>
          <div className="row g-0 custom-card-login">
            <div className="col-md-7 d-flex align-items-center">
              <div className="w-100 h-100">
                <img
                  className="img-fluid rounded full-fit"
                  src={logo}
                  alt="Logo"
                />
              </div>
            </div>
            <div className="col-md-5">
              <div className="card-body text-center login-form-card">
                <h5 className="card-title" style={{ color: "#0047AB" }}>
                  WaterApp
                </h5>
                <form onSubmit={handleLogin} className="login-form" style={{padding:"2rem"}}>
                  <div className="mb-3">
                    <label>Usuario</label>
                    <input
                      className="form-control me-2 form-control-sm"
                      type="text"
                      placeholder="ccarlos."
                      aria-label="Usuario"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label>Contraseña</label>
                    <input
                      className="form-control me-2 form-control-sm"
                      type="password"
                      placeholder="*************"
                      aria-label="Contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button className="btn btn-primary btn-login" type="submit">
                    Acceder
                  </button>
                  <p>{mensaje}</p>
                </form>
                <div className="card-text mt-3">
                  <div className="login-right">
                    <hr />
                    <p className="login-recuperar">¿Olvidaste tu contraseña?</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
