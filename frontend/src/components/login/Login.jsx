import React from "react";
import logo from "../../assets/login/logo-login.jpg";
import styles from "./Login.module.css"; // Assuming you have a CSS module for styles
import { useState } from "react";
import axios from "axios";
const Login = () => {

const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [mensaje, setMensaje] = useState("");

const handleLogin = async (e) =>{
  e.preventDefault(); // Esto es necesario para evitar que la página se recargue al enviar el formulario
  console.log("EStoy entrando en el handleLogin");
  try {
    
    const response = await axios.post("http://localhost:3000/login", { 
      username: username,
      password: password
      
    });
    
    const rol = response.data.user.rol_name;
    setMensaje('Bienvenido ' + username + ' con rol ' + rol);
  } catch (error) {
    setMensaje('Error al iniciar sesión: ' + error.response.data.error);
  }
}

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
              <form>
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
                <button className="btn btn-primary w-50" type="submit" onClick={handleLogin}>
                  Acceder
                </button>
                <p>{mensaje}</p>
              </form>
              <div className="card-text mt-3">
                <div className="login-right">
                  <hr />
                  <p>¿Perdiste tu contraseña?</p>
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
