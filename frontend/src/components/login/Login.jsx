import React from "react";
import logo from "../../assets/login/logo-login.jpg";
import styles from "./Login.module.css"; // Assuming you have a CSS module for styles
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../hooks/authContext';

const Login = () => {
const navigate = useNavigate();
const {setUser}= useAuth();
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [mensaje, setMensaje] = useState("");

const handleLogin = async (e) => {
  e.preventDefault();

  try {//Api del back para los usuarios
    const response = await axios.post("http://localhost:3000/api/login", {
      user: username,
      password: password,
    });
    
    const { token, id, role } = response.data; //extrae info de la 

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("id_usuario", response.data.id);
    localStorage.setItem("rol_id", response.data.role);
    
    setUser({id: response.data.id, role: response.data.role})
    
    setMensaje("Bienvenido " + username);

    if (id === 1 || id === 5) { 
      navigate("/admin/dashboard");
    } else { 
      navigate("/dashboard");
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
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh"}}
    >
      <div className="card mb-3" style={{ maxWidth: "900px", width: "100%" }}>
        <div className="row g-0">
          <div className="col-md-5 d-flex align-items-center">
            <img src={logo} className="img-fluid rounded" alt="..." />
          </div>
          <div className="col-md-7">
            <div className="card-body">
              <h5 className="card-title">Bienvenido</h5>
              <form onSubmit={handleLogin}>
                <label>Usuario</label>
                <input
                  className="form-control me-2"
                  type="text"
                  placeholder="Usuario"
                  aria-label="Usuario"
                  value={username}  
                  onChange={(e) => setUsername(e.target.value)}
                />
                <br />
                <label>Contraseña</label>
                <input
                  className="form-control me-2"
                  type="password"
                  placeholder="Contraseña"
                  aria-label="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button className="btn btn-primary w-50" type="submit">
                  Acceder
                </button>
                <p>{mensaje}</p>
              </form>
              <div className="card-text mt-3">
                <div className="login-right">
                  <hr />
                  <p>¿Olvidaste tu contraseña?</p>
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
