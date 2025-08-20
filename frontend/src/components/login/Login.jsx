import React from "react";
import logo from "../../assets/login/logo-login.jpg";
import styles from "./Login.module.css"; // Assuming you have a CSS module for styles
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
const navigate = useNavigate();
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [mensaje, setMensaje] = useState("");

const handleLogin = async (e) =>{
  e.preventDefault(); // Esto es necesario para evitar que la página se recargue al enviar el formulario

  try {

    //Peticion para poder acceder a la informacion de la base de datos/ para el inicio de sesion
    const response = await axios.post("http://localhost:3000/api/login", { 
      user: username, //envia al back los datos que se almacenaron en el login del front, para poder hacer el incio de sesion
      password: password
      
    }) .then(response =>{
      const {token, id, role} = response.data //Guarda los datos que retorn a mi api, para validar a que pagina redirigir
      localStorage.setItem('token',token);
      localStorage.setItem('id_usuario',id);
      localStorage.setItem('rol_id', role);

      if(id === 1 || id ===5){
        console.log("Hola admin")
        navigate("/admin/dashboard")
      }else{
        navigate("/dashboard")
        console.log("No eres admin :( ")
      }
    });
    

    setMensaje('Bienvenido ' + username);
  } catch (error) {
 if (error.response) {
    // Aqui se accede al mensaje que ennvia mi api
    const mensaje = error.response.data.message;
    console.log('Error de login:', mensaje);

    setMensaje(mensaje); // para mostrar los mensajes
  } else {
    console.log('Error inesperado:', error.message);
  }

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
